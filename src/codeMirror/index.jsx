const CodeMirror = require('codemirror');
const React = require('react');
const Variable = require('@readme/variable');
const { getMode } = require('../utils/modes');

const { VARIABLE_REGEXP } = Variable;
require('./style.scss');
require('codemirror/addon/runmode/runmode');
require('codemirror/mode/meta.js');

const defaultLineJsx = line => (
  <p key={`ln-${line}`} className="cm-lineNumber cm-overlay">
    {line}
  </p>
);

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

  const wrappedOutput = [];
  let bucket = [];

  output.forEach((o, idx) => {
    const lineBreakRegex = /\n/g;
    if (idx === output.length - 1) {
      bucket.push(o);
      wrappedOutput.push(bucket);
    } else if (!lineBreakRegex.test(o)) bucket.push(o);
    else {
      wrappedOutput.push(bucket);
      lineNumber += 1;
      bucket = [defaultLineJsx(lineNumber)];
    }
  });

  return (
    <div className="CodeMirror cm-s-material-palenight">
      {wrappedOutput.map((ac, idx) => (
        <div key={idx} className="cm-linerow">
          {ac}
        </div>
      ))}
    </div>
  );
};

module.exports = ReadmeCodeMirror;
