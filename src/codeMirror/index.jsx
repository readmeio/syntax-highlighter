import CodeMirror from 'codemirror';
import React from 'react';
import PropTypes from 'prop-types';
import Variable, { VARIABLE_REGEXP, VariablesContext } from '@readme/variable';
import { getMode } from '../utils/modes';

import '../utils/cm-mode-imports';
import './style.scss';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/meta';

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

/**
 * Generate an array of classNames
 *
 * @arg {[][]{line: Int}} ranges
 * @return {[String]} Consumable classNames
 */
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
    if (o.length === 1) {
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
    <div className="CodeMirror cm-s-material-palenight">
      <StructuredOutput gutteredInput={gutteredOutput} highlights={highlights} />
    </div>
  );
};

/**
 * Remove variables from a code block. Returns the text with the
 * variables removed an array of variables and their insert positions.
 *
 * @arg {string} code
 * @arg {object} opts
 * @return {[string, {length: number, text: string, offset: number }[]]}
 */
const extractVariables = (code, opts) => {
  if (!opts.tokenizeVariables) return [code];

  let offsetDelta = 0;
  const variables = [];
  const replacer = ({ length }, capture, offset) => {
    variables.push({ length, text: capture, offset: offset - offsetDelta });
    offsetDelta += length;

    return '';
  };

  const codeWithoutVars = code.replace(new RegExp(VARIABLE_REGEXP, 'g'), replacer);

  return [codeWithoutVars, variables];
};

/**
 * Reinsert variables into the styled code tokens.
 * NOTE: modifies styled in place
 *
 * @arg {[string, string][]} styled - code tokens with style
 * @arg {{length: Number, text: String, offset: Number }[]} variables - variables and their offsets
 * @arg {object} opts
 * @return {[string, string][]}
 */
const insertVariables = (styled, variables, opts) => {
  if (!opts.tokenizeVariables) return styled;

  let offset = 0;
  let index = 0;
  let currentToken = styled[index][0];

  variables.forEach((variable, i) => {
    while (!(offset <= variable.offset && variable.offset <= offset + currentToken.length)) {
      offset += currentToken.length;
      index += 1;
      currentToken = styled[index][0];
    }

    const tokenOffset = variable.offset - offset;
    styled[index][0] = [
      currentToken.slice(0, tokenOffset),
      <Variable key={`variable-${i}`} variable={variable.text} />,
      currentToken.slice(tokenOffset),
    ];
  });

  return styled;
};

StyledSyntaxHighlighter.propTypes = {
  output: PropTypes.arrayOf(PropTypes.any),
  ranges: PropTypes.arrayOf(PropTypes.any),
};

/**
 * Core Syntax Highlighter
 * @arg {String} code
 * @arg {String} lang
 * @arg {{}} opts
 * @return {[Element]} Array of DOM Elements
 */
const ReadmeCodeMirror = (code, lang, opts = { tokenizeVariables: false, highlightMode: false, ranges: [] }) => {
  const mode = getMode(lang);
  const styled = [];

  const [codeWithoutVars, variables] = extractVariables(code, opts);

  let curStyle = null;
  let accum = '';

  function flush() {
    styled.push([accum, curStyle]);
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

  const output = insertVariables(styled, variables, opts).map(([text, style], i) =>
    style ? (
      <span key={i} className={`${style.replace(/(^|\s+)/g, '$1cm-')}`}>
        {text}
      </span>
    ) : (
      text
    )
  );

  // Return legacy DOM structure
  // Array of <span /> elements
  if (!opts.highlightMode) return output;
  // Return Codemirror-Styled DOM structure
  // Includes line numbers, styling, optional highlighting
  return <StyledSyntaxHighlighter output={output} ranges={opts.ranges} />;
};

export default ReadmeCodeMirror;
export { VariablesContext };
