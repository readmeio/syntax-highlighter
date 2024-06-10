import Variable, { MDX_VARIABLE_REGEXP, VARIABLE_REGEXP, VariablesContext } from '@readme/variable';
import CodeMirror from 'codemirror';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/mode/meta';
import PropTypes from 'prop-types';
import React from 'react';

import '../utils/cm-mode-imports';
import { getMode } from '../utils/modes';

import './style.scss';

// Pre output conversion
// CodeMirror "Gutter" -> Apply line numbers to styled lines
const defaultLineJsx = line => (
  <span key={`ln-${line}`} className="cm-lineNumber">
    {line}
  </span>
);

// Wrap children elements, seperated by line into divs
// Simple styling wrapper
const WrappedLine = ({ className, child }) => <div className={className}>{child}</div>;

WrappedLine.propTypes = {
  child: PropTypes.any,
  className: PropTypes.string,
};

// Final Styled Output
// Includes Highlighted | Overlayed | null styled lines
const StructuredOutput = ({ gutteredInput, highlights = [] }) =>
  gutteredInput.map((ac, idx) => {
    return (
      <WrappedLine
        key={`cm-wrapped-${idx}`}
        child={ac}
        className={['cm-linerow', highlights.length ? highlights[idx] : ''].join(' ')}
      />
    );
  });

StructuredOutput.propTypes = {
  gutteredInput: PropTypes.any,
  highlights: PropTypes.arrayOf(PropTypes.string),
};

const highlightedLines = (ranges, totalLength) => {
  const highlights = [];

  ranges.forEach(([anchor, head]) => {
    const end = head.line;
    let position = anchor.line;

    while (position < end) {
      highlights[position] = 'cm-highlight';
      position += 1;
    }
  });

  for (let i = 0; i < totalLength; i += 1) {
    if (!highlights[i]) highlights[i] = 'cm-overlay';
  }

  return highlights;
};

const StyledSyntaxHighlighter = ({ output, ranges }) => {
  const lineBreakRegex = /\r?\n/;
  const gutteredOutput = [];
  let bucket = [];
  let lineNumber = 1;

  const incrementLine = newLine => {
    // If new line, we'll manually add it to a bucket
    if (newLine) bucket.push('\n');
    // Regardless, we'll add the bucket to our larger output and start a new numbered div
    gutteredOutput.push(bucket);
    lineNumber += 1;
    bucket = [defaultLineJsx(lineNumber)];
  };

  const enumerateMatches = (o, final) => {
    // Case where a single line break
    if (o.length === 1 && lineBreakRegex.test(o)) {
      incrementLine(true);
      // Case with multiple consecutive line breaks
    } else {
      const matches = o.split(lineBreakRegex);
      matches.forEach(m => {
        if (m.length) {
          bucket.push(m);
          // If we've found a match right before the end of our output, we pad it
          if (final) incrementLine();
        } else {
          incrementLine(true);
        }
      });
    }
  };

  output.unshift(defaultLineJsx(1));
  output.forEach((o, idx) => {
    if (idx === output.length - 1) {
      if (typeof o === 'string') enumerateMatches(o, true);
      else {
        bucket.push(o);
        gutteredOutput.push(bucket);
      }
    } else if (!lineBreakRegex.test(o)) {
      bucket.push(o);
    } else if (typeof o === 'string') {
      enumerateMatches(o);
    }
  });

  const highlights = ranges && ranges.length ? highlightedLines(ranges, gutteredOutput.length) : [];
  return (
    <div className="CodeMirror" data-testid="CodeMirror">
      <StructuredOutput gutteredInput={gutteredOutput} highlights={highlights} />
    </div>
  );
};

/*
 * ReadMe user variables are written like <<var>>. Depending on the
 * language parser used by CodeMirror, that could get parsed into
 * multiple tokens, ie ['<<', 'var', '>>']. So, we do a first pass to
 * remove the variables. And reinsert them after CodeMirror has done its
 * parsing.
 */
const makeReinserter = variables => {
  let offset = 0;
  let variable = variables.shift();

  const reinsertVariables = token => {
    if (!variable) return token;

    if (offset <= variable.offset && variable.offset <= offset + token.length) {
      const tokenOffset = variable.offset - offset;
      const [before, after] = [token.slice(0, tokenOffset), token.slice(tokenOffset)];
      const variableComponent = <Variable key={`variable-${offset}`} variable={variable.text} />;

      offset += tokenOffset;
      variable = variables.shift();

      return [before, variableComponent, reinsertVariables(after)];
    }

    offset += token.length;
    return token;
  };

  return reinsertVariables;
};

const extractVariables = (code, opts) => {
  if (!opts.tokenizeVariables) return [code, text => text];

  let offsetDelta = 0;
  const variables = [];

  const extracter = (match, ...rest) => {
    const unescaped = opts.mdx
      ? match.replace(/^\\{/, '{').replace(/\\}$/, '}')
      : match.replace(/^\\<</, '<<').replace(/\\>>$/, '>>');

    if (unescaped !== match) {
      return unescaped;
    }

    const capture = rest[opts.mdx ? 1 : 0];
    const offset = rest[opts.mdx ? 3 : 1];

    variables.push({ text: capture, offset: offset - offsetDelta });
    offsetDelta += match.length;

    return '';
  };

  const regexp = opts.mdx ? MDX_VARIABLE_REGEXP : VARIABLE_REGEXP;
  const codeWithoutVars = code.replace(new RegExp(regexp, 'g'), extracter);

  console.log(regexp);

  return [codeWithoutVars, makeReinserter(variables)];
};

StyledSyntaxHighlighter.propTypes = {
  output: PropTypes.arrayOf(PropTypes.any),
  ranges: PropTypes.arrayOf(PropTypes.any),
};

const ReadmeCodeMirror = (
  code,
  lang,
  opts = { tokenizeVariables: false, highlightMode: false, ranges: [] },
  { mdx = false } = {},
) => {
  const mode = getMode(lang);
  const output = [];

  const [codeWithoutVars, reinsertVariables] = extractVariables(code, { scrollbarStyle: 'overlay', mdx, ...opts });

  let curStyle = null;
  let accum = '';
  let key = 0;

  function flush() {
    const token = reinsertVariables(accum);

    const styledToken = curStyle ? (
      // eslint-disable-next-line no-plusplus
      <span key={key++} className={`${curStyle.replace(/(^|\s+)/g, '$1cm-')}`}>
        {token}
      </span>
    ) : (
      token
    );

    output.push(styledToken);
  }

  CodeMirror.runMode(codeWithoutVars, mode, (text, style) => {
    const lineBreakRegex = /\r?\n/;
    if (style !== curStyle || (opts.highlightMode && lineBreakRegex.test(text))) {
      flush();
      curStyle = style;
      accum = text;
    } else {
      accum += text;
    }
  });
  flush();

  // Return legacy DOM structure
  // Array of <span /> elements
  if (!opts.highlightMode) return output;
  // Return Codemirror-Styled DOM structure
  // Includes line numbers, styling, optional highlighting
  return <StyledSyntaxHighlighter output={output} ranges={opts.ranges} />;
};

export default ReadmeCodeMirror;
export { VariablesContext };
/**
 * Generate an array of classNames
 *
 * @arg {[][]{line: Int}} ranges
 * @return {[String]} Consumable classNames
 */
/**
 * Core Syntax Highlighter
 * @arg {String} code
 * @arg {String} lang
 * @arg {{}} opts
 * @return {[Element]} Array of DOM Elements
 */
