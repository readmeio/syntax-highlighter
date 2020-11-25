import { mount, shallow } from 'enzyme';
import path from 'path';
import glob from 'glob';
import { promises as fs } from 'fs';
import Variable from '@readme/variable';
import syntaxHighlighter, { uppercase, canonical } from '../src';

const fixtures = glob.sync(path.join(__dirname, '/__fixtures__/*'));

test('should highlight a block of code', () => {
  const code = shallow(syntaxHighlighter('var a = 1;', 'javascript'));

  expect(code.hasClass('cm-s-neo')).toBe(true);
  expect(code.html()).toBe(
    '<div class="cm-s-neo"><span class="cm-keyword">var</span> <span class="cm-def">a</span> <span class="cm-operator">=</span> <span class="cm-number">1</span>;</div>'
  );
});

test('should work when passed a non-string value', () => {
  expect(() => syntaxHighlighter(false, 'text')).not.toThrow();
});

test('should sanitize plain text language', () => {
  expect(shallow(syntaxHighlighter('& < > " \' /', 'text')).html()).toContain('&amp; &lt; &gt; &quot; &#x27; /');
});

test('should sanitize mode', () => {
  expect(shallow(syntaxHighlighter('&', 'json')).html()).toContain('&amp;');
  expect(shallow(syntaxHighlighter('<', 'json')).html()).toContain('&lt;');
});

test('should concat the same style items', () => {
  // This is testing the `accum += text;` line
  expect(shallow(syntaxHighlighter('====', 'javascript')).text()).toContain('====');
});

test('should work with modes', () => {
  expect(shallow(syntaxHighlighter('{ "a": 1 }', 'json')).html()).toBe(
    '<div class="cm-s-neo">{ <span class="cm-property">&quot;a&quot;</span>: <span class="cm-number">1</span> }</div>'
  );
});

test('should have a dark theme', () => {
  expect(shallow(syntaxHighlighter('{ "a": 1 }', 'json', { dark: true })).hasClass('cm-s-material-palenight')).toBe(
    true
  );
});

test('should tokenize variables (double quotes)', () => {
  expect(mount(syntaxHighlighter('"<<apiKey>>"', 'json', { tokenizeVariables: true })).find('Variable')).toHaveLength(
    1
  );
});

test('should tokenize variables (single quotes)', () => {
  expect(mount(syntaxHighlighter("'<<apiKey>>'", 'json', { tokenizeVariables: true })).find('Variable')).toHaveLength(
    1
  );
});

test('should keep enclosing characters around the variable', () => {
  expect(mount(syntaxHighlighter("'<<apiKey>>'", 'json', { tokenizeVariables: true })).text()).toBe("'APIKEY'");
});

test('should tokenize variables outside of quotes', () => {
  expect(mount(syntaxHighlighter('<<apiKey>>', 'json', { tokenizeVariables: true })).text()).toBe('APIKEY');
});

test('should tokenize variables outside of quotes over multple lines', () => {
  const codeBlock = `
  const foo = <<apiKey>>;
  const bar = <<name>>;

  fetch({ foo, bar, baz: <<token>> });
`;

  expect(mount(syntaxHighlighter(codeBlock, 'json', { tokenizeVariables: true })).text()).toMatchSnapshot();
});

test('should tokenize multiple variables per line', () => {
  expect(mount(syntaxHighlighter('<<apiKey>> <<name>>', 'json', { tokenizeVariables: true })).text()).toBe(
    'APIKEY NAME'
  );
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
      expect(instructions).not.toBeUndefined();
      expect(instructions).toStrictEqual({
        language: expect.any(String),
        mode: expect.objectContaining({
          primary: expect.any(String),
          aliases: expect.any(Object),
        }),
      });
    });

    it('should syntax highlight an example', () => {
      const highlighted = shallow(syntaxHighlighter(testCase, instructions.mode.primary)).html();
      expect(highlighted).toMatchSnapshot();
    });

    if (Object.keys(instructions.mode.aliases).length > 0) {
      const aliases = Object.keys(instructions.mode.aliases).map(alias => [alias, instructions.mode.aliases[alias]]);

      describe('Mode aliases', () => {
        describe.each(aliases)('%s', (alias, aliasName) => {
          it('should support the mode alias', () => {
            const highlighted = shallow(syntaxHighlighter(testCase, instructions.mode.primary)).html();
            expect(shallow(syntaxHighlighter(testCase, alias)).html()).toBe(highlighted);
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
        expect(shallow(syntaxHighlighter(code, 'handlebars')).html()).toContain('cm-bracket');
      });
    } else if (instructions.mode.primary === 'php') {
      it('should highlight if missing an opening `<?php` tag', () => {
        expect(shallow(syntaxHighlighter('echo "Hello World";', 'php')).html()).toContain('cm-keyword');
      });
    }
  });
});

describe('highlight mode', () => {
  let node;
  const code = `curl --request POST
  --url <<url>>
  --header 'authorization: Bearer 123'
  --header 'content-type: application/json'`;

  beforeEach(() => {
    node = mount(
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
      })
    );
  });

  it('should return line numbers by default', () => {
    expect(node.find('span').first().hasClass('cm-lineNumber')).toBe(true);
  });

  it('should convert variable regex matches to a component instance', () => {
    expect(node.find(Variable)).toHaveLength(1);
  });

  it('should highlight based on range input', () => {
    expect(node.find('.cm-linerow.cm-highlight')).toHaveLength(2);
  });

  it('should add an overlay to non-highlighted in lines when ranges are applied', () => {
    expect(node.find('.cm-linerow.cm-overlay')).toHaveLength(6);
  });
});

describe('runmode', () => {
  let node;
  const code = `CURL *hnd = curl_easy_init();\n\nurl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");\n\ncurl_easy_setopt(hnd, CURLOPT_URL, "http://httpbin.orgpet/");`;

  beforeEach(() => {
    node = mount(
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
      })
    );
  });

  it('should display the correct number of lines with multiple linebreaks', () => {
    const checkLineBreaks = parseInt(node.find('.cm-linerow').last().find('.cm-lineNumber').text(), 10);
    const totalLines = code.split('\n');

    expect(checkLineBreaks).toStrictEqual(totalLines.length);
  });
});
