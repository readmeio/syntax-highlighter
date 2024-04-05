/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { promises as fs } from 'fs';
import path from 'path';

// eslint-disable-next-line testing-library/no-manual-cleanup
import { render, screen, cleanup } from '@testing-library/react';
import { globSync } from 'glob';

import syntaxHighlighter, { uppercase, canonical } from '../src';

const fixtures = globSync(path.join(__dirname, '/__fixtures__/*'));

test('should highlight a block of code', () => {
  render(syntaxHighlighter('var a = 1;', 'javascript'));

  expect(screen.getByTestId('SyntaxHighlighter').outerHTML).toBe(
    '<div class="cm-s-neo" data-testid="SyntaxHighlighter"><span class="cm-keyword">var</span> <span class="cm-def">a</span> <span class="cm-operator">=</span> <span class="cm-number">1</span>;</div>',
  );
});

test('should work when passed a non-string value', () => {
  expect(() => syntaxHighlighter(false, 'text')).not.toThrow();
});

test('should sanitize plain text language', () => {
  render(syntaxHighlighter('& < > " \' /', 'text'));
  expect(screen.getByText('& < > " \' /')).toBeVisible();
});

test('should sanitize mode', () => {
  render(syntaxHighlighter('&', 'json'));
  expect(screen.getByText('&')).toBeVisible();

  render(syntaxHighlighter('<', 'json'));
  expect(screen.getByText('<')).toBeVisible();
});

test('should concat the same style items', () => {
  // This is testing the `accum += text;` line
  render(syntaxHighlighter('====', 'javascript'));
  expect(screen.getByText('====')).toBeVisible();
});

test('should work with modes', () => {
  render(syntaxHighlighter('{ "a": 1 }', 'json'));

  expect(screen.getByTestId('SyntaxHighlighter').outerHTML).toBe(
    '<div class="cm-s-neo" data-testid="SyntaxHighlighter">{ <span class="cm-property">"a"</span>: <span class="cm-number">1</span> }</div>',
  );
});

test('should keep trailing json bracket if highlightMode is enabled', () => {
  render(syntaxHighlighter('{ "a": 1 }', 'json', { highlightMode: true }));

  expect(screen.getByTestId('CodeMirror').outerHTML).toBe(
    '<div class="CodeMirror" data-testid="CodeMirror"><div class="cm-linerow "><span class="cm-lineNumber">1</span>{ <span class="cm-property">"a"</span>: <span class="cm-number">1</span> }</div></div>',
  );
});

test('should have a dark theme', () => {
  render(syntaxHighlighter('{ "a": 1 }', 'json', { dark: true }));
  expect(screen.getByTestId('SyntaxHighlighter')).toHaveClass('cm-s-material-palenight');
});

describe('variable substitution', () => {
  it('should tokenize variables (double quotes)', () => {
    render(syntaxHighlighter('"<<apiKey>>"', 'json', { tokenizeVariables: true }));
    expect(screen.getByText('APIKEY')).toBeVisible();
  });

  it('should tokenize variables (single quotes)', () => {
    render(syntaxHighlighter("'<<apiKey>>'", 'json', { tokenizeVariables: true }));
    expect(screen.getByText('APIKEY')).toBeVisible();
  });

  it('should keep enclosing characters around the variable', () => {
    render(syntaxHighlighter("'<<apiKey>>'", 'json', { tokenizeVariables: true }));
    expect(screen.getByTestId('SyntaxHighlighter')).toHaveTextContent("'APIKEY'");
  });

  it('should tokenize variables outside of quotes', () => {
    render(syntaxHighlighter('<<apiKey>>', 'json', { tokenizeVariables: true }));
    expect(screen.getByText('APIKEY')).toBeVisible();
  });

  it('should tokenize variables outside of quotes over multiple lines', () => {
    const codeBlock = `
    const foo = <<apiKey>>;
    const bar = <<name>>;

    fetch({ foo, bar, baz: <<token>> });
  `;

    render(syntaxHighlighter(codeBlock, 'json', { tokenizeVariables: true }));
    expect(screen.getByTestId('SyntaxHighlighter').textContent).toMatchSnapshot();
  });

  it('should tokenize multiple variables per line', () => {
    render(syntaxHighlighter('<<apiKey>> <<name>>', 'json', { tokenizeVariables: true }));
    expect(screen.getByTestId('SyntaxHighlighter')).toHaveTextContent('APIKEY NAME');
  });

  it.each(['\\<<wat>>', '<<wat\\>>', '\\<<wat\\>>'])('should NOT tokenize escaped variables %s', code => {
    render(syntaxHighlighter(code, 'json', { tokenizeVariables: true }));
    expect(screen.getByTestId('SyntaxHighlighter')).toHaveTextContent('<<wat>>');
  });
});

describe('Supported languages', () => {
  const languages = fixtures.map(fixture => {
    return [uppercase(path.basename(fixture)), fixture];
  });

  describe.each(languages)('%s', (language, fixtureDir) => {
    let testCase;

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const instructions = require(path.join(fixtureDir, 'index.js'));

    beforeEach(async () => {
      testCase = await fs.readFile(path.join(fixtureDir, `sample.${instructions.mode.primary}`), 'utf8');
    });

    it('should have a properly formatted instruction set', () => {
      expect(instructions).toBeDefined();
      expect(instructions).toStrictEqual({
        language: expect.any(String),
        mode: expect.objectContaining({
          primary: expect.any(String),
          aliases: expect.any(Object),
        }),
      });
    });

    it('should syntax highlight an example', () => {
      render(syntaxHighlighter(testCase, instructions.mode.primary));
      expect(screen.getByTestId('SyntaxHighlighter').outerHTML).toMatchSnapshot();
    });

    if (Object.keys(instructions.mode.aliases).length > 0) {
      const aliases = Object.keys(instructions.mode.aliases).map(alias => [alias, instructions.mode.aliases[alias]]);

      describe('Mode aliases', () => {
        describe.each(aliases)('%s', (alias, aliasName) => {
          it('should support the mode alias', () => {
            render(syntaxHighlighter(testCase, instructions.mode.primary));
            const highlighted = screen.getByTestId('SyntaxHighlighter').outerHTML;
            cleanup();

            render(syntaxHighlighter(testCase, alias));
            expect(screen.getByTestId('SyntaxHighlighter').outerHTML).toBe(highlighted);
          });

          it('should uppercase the mode alias', () => {
            expect(uppercase(alias)).toBe(aliasName);
          });

          if ('canonical' in instructions.mode) {
            it('should have a canonical directive set up', () => {
              expect(canonical(alias)).toBe(instructions.mode.canonical);
            });
          } else {
            it('should have a canonical directive set up off the primary mode', () => {
              expect(canonical(alias)).toBe(instructions.mode.primary);
            });
          }
        });
      });
    }

    if (instructions.mode.primary === 'html') {
      it('should highlight handlebars templates', () => {
        const code = '<p>{{firstname}} {{lastname}}</p>';
        const { container } = render(syntaxHighlighter(code, 'handlebars'));

        expect(container.querySelector('.cm-bracket')).toBeVisible();
      });
    } else if (instructions.mode.primary === 'php') {
      it('should highlight if missing an opening `<?php` tag', () => {
        const code = 'echo "Hello World";';
        const { container } = render(syntaxHighlighter(code, 'php'));

        expect(container.querySelector('.cm-keyword')).toBeVisible();
      });
    }
  });
});

describe('highlight mode', () => {
  const code = `curl --request POST
  --url <<url>>
  --header 'authorization: Bearer 123'
  --header 'content-type: application/json'`;

  const defaultRender = () =>
    render(
      syntaxHighlighter(code, 'curl', {
        dark: true,
        highlightMode: true,
        tokenizeVariables: true,
        ranges: [
          [
            { ch: 0, line: 0 },
            { ch: 0, line: 1 },
          ],
        ],
      }),
    );

  it('should return line numbers by default', () => {
    const { container } = defaultRender();
    expect(container.querySelector('.cm-lineNumber')).toBeVisible();
  });

  it('should highlight variables', () => {
    defaultRender();
    expect(screen.getByText('URL')).toBeVisible();
  });

  it('should highlight based on range input', () => {
    const { container } = defaultRender();
    expect(container.querySelector('.cm-linerow.cm-highlight')).toHaveTextContent('1curl --request POST');
  });

  it('should add an overlay to non-highlighted in lines when ranges are applied', () => {
    const { container } = defaultRender();
    expect(container.querySelectorAll('.cm-linerow.cm-overlay')).toHaveLength(3);
  });
});

describe('runmode', () => {
  const code =
    'CURL *hnd = curl_easy_init();\n\nurl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");\n\ncurl_easy_setopt(hnd, CURLOPT_URL, "http://httpbin.orgpet/");';

  it('should display the correct number of lines with multiple linebreaks', () => {
    render(
      syntaxHighlighter(code, 'c', {
        dark: true,
        highlightMode: true,
        tokenizeVariables: true,
        ranges: [
          [
            { ch: 0, line: 0 },
            { ch: 0, line: 1 },
          ],
        ],
      }),
    );

    expect(screen.getAllByText(/\d/)).toHaveLength(5);
  });
});

describe('code folding', () => {
  beforeAll(() => {
    // Prevents tests from throwing `TypeError: range(...).getBoundingClientRect is not a function`
    // Ref: https://github.com/jsdom/jsdom/issues/3002
    document.createRange = () => {
      const range = new Range();

      range.getBoundingClientRect = jest.fn();

      range.getClientRects = jest.fn(() => ({
        item: () => null,
        length: 0,
      }));

      return range;
    };
  });

  it('renders folders in the gutter', () => {
    const { container } = render(
      syntaxHighlighter('{ "a": { "b": { "c": 1 } }', 'json', { foldGutter: true, readOnly: true }),
    );

    expect(container.querySelector('.CodeMirror-foldgutter')).toBeVisible();
  });
});
