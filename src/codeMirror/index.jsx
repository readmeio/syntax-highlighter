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
        // Attempting to add the highlight class to this span only highlights certain text in the line, not everything
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

  // Could try to move the conditonal for highlighting here - when I did I either missed out on highlighting the first or last line though
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

  // Tried to grab the '.CodeMirror' element or assign an id/classname to query the specific divs
  // Thought by doing that I could get each div and change their className but no luck. Also would have similar out of index issue as below

  // indexing into wrappedOutput using the anchor and head causes issues due to the anchor possibly being 0 but then the head being out of index (5)

  if (opts.highlightMode && opts.ranges) {
    opts.ranges.forEach(([anchor, head]) => {
      for (let i = anchor.line; i <= head.line; i += 1) {
        // apply highlight to specific lines here - see Index.js for what the ranges input looks like
      }
    });
  }

  // the cm-overlay class name needs to go on the div we're making in {wrappedOutput}
  return (
    <div className="CodeMirror cm-s-material-palenight">
      {wrappedOutput.map((ac, idx) => (
        <div key={idx}>{ac}</div>
      ))}
    </div>
  );
};

module.exports = ReadmeCodeMirror;
