import CodeMirror from 'codemirror';
import React from 'react';
import PropTypes from 'prop-types';
import Variable, { VARIABLE_REGEXP } from '@readme/variable';
import { getMode } from '../utils/modes';

import './style.scss';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/meta';

// Pre output conversion
// CodeMirror "Gutter" -> Apply line numbers to styled lines
const defaultLineJsx = line => (
  <p key={`ln-${line}`} className="cm-lineNumber">
    {line}
  </p>
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
  gutteredInput.map((ac, idx) => (
    <WrappedLine
      key={`cm-wrapped-${idx}`}
      child={ac}
      className={['cm-linerow', highlights.length ? highlights[idx] : ''].join(' ')}
    />
  ));

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
const highlightedLines = ranges => {
  const highlights = [];

  ranges.forEach(([anchor, head]) => {
    const end = head.line;
    let position = anchor.line;

    while (position <= end) {
      highlights[position] = 'cm-highlight';
      position += 1;
    }
  });

  for (let i = 0; i < highlights.length; i += 1) {
    if (!highlights[i]) highlights[i] = 'cm-overlay';
  }

  return highlights;
};

const StyledSyntaxHighlighter = ({ output, ranges }) => {
  const gutteredOutput = [];
  let bucket = [];
  let lineNumber = 1;

  output.unshift(defaultLineJsx(1));
  output.forEach((o, idx) => {
    const lineBreakRegex = /\n/g;

    if (idx === output.length - 1) {
      bucket.push(o);
      gutteredOutput.push(bucket);
    } else if (!lineBreakRegex.test(o)) {
      bucket.push(o);
    } else {
      gutteredOutput.push(bucket);
      lineNumber += 1;
      bucket = [defaultLineJsx(lineNumber)];
    }
  });

  const highlights = ranges && ranges.length ? highlightedLines(ranges) : [];
  return (
    <div className="CodeMirror cm-s-material-palenight">
      <StructuredOutput gutteredInput={gutteredOutput} highlights={highlights} />
    </div>
  );
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
  let key = 0;
  const mode = getMode(lang);
  const output = [];

  function tokenizeVariable(value) {
    // Modifies the regular expression to match anything
    // before or after like quote characters: ' "
    const match = new RegExp(`(.*)${VARIABLE_REGEXP}([^]*)`).exec(value);

    if (!match) return value;

    // eslint-disable-next-line no-plusplus
    return [match[1], <Variable key={++key} variable={match[2]} />, match[3]];
  }

  let curStyle = null;
  let accum = '';

  function flush() {
    accum = opts.tokenizeVariables ? tokenizeVariable(accum) : accum;
    if (curStyle) {
      output.push(
        // eslint-disable-next-line no-plusplus
        <span key={++key} className={`${curStyle.replace(/(^|\s+)/g, '$1cm-')}`}>
          {accum}
        </span>
      );
    } else {
      output.push(accum);
    }
  }

  CodeMirror.runMode(code, mode, (text, style) => {
    if (style !== curStyle) {
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
