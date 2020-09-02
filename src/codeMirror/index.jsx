const CodeMirror = require('codemirror');
const React = require('react');
const Variable = require('@readme/variable');
const { getMode } = require('../utils/modes');

const { VARIABLE_REGEXP } = Variable;

require('codemirror/addon/runmode/runmode');
require('codemirror/mode/meta.js');

module.exports = (code, lang, opts = { tokenizeVariables: false }) => {
  const output = [];
  let key = 0;
  const mode = getMode(lang);

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

  return output;
};
