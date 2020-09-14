const CodeMirror = require('codemirror');
const React = require('react');
const PropTypes = require('prop-types');
const Variable = require('@readme/variable');
const { getMode } = require('../utils/modes');

const { VARIABLE_REGEXP } = Variable;
require('./style.scss');
require('codemirror/addon/runmode/runmode');
require('codemirror/mode/meta.js');

const defaultLineJsx = line => (
  <p key={`ln-${line}`} className="cm-lineNumber">
    {line}
  </p>
);

const WrappedLine = ({ className, child }) => <div className={className}>{child}</div>;

WrappedLine.propTypes = {
  child: PropTypes.any,
  className: PropTypes.string,
};

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

const ReadmeCodeMirror = (code, lang, opts = { tokenizeVariables: false, highlightMode: false, ranges: [] }) => {
  let key = 0;
  let lineNumber = 1;
  const mode = getMode(lang);
  const output = opts.highlightMode ? [defaultLineJsx(lineNumber)] : [];

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

  if (!opts.highlightMode) return output;

  const gutteredOutput = [];
  let bucket = [];

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

  const highlights = opts.ranges && opts.ranges.length ? highlightedLines(opts.ranges) : [];
  return (
    <div className="CodeMirror cm-s-material-palenight">
      <StructuredOutput gutteredInput={gutteredOutput} highlights={highlights} />
    </div>
  );
};

module.exports = ReadmeCodeMirror;
