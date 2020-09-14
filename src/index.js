const React = require('react');
const codemirror = require('./codeMirror/index.jsx');
const codeEditor = require('./codeEditor/index.jsx');

// eslint-disable-next-line react/display-name
module.exports = (code, lang, opts = { dark: false, tokenizeVariables: false, editable: false }, editorProps = {}) => {
  if (opts.editable) {
    return React.createElement(
      codeEditor,
      {
        ...editorProps,
        code,
        lang,
      },
      null
    );
  }

  let classes = '';
  if (opts.highlightMode) {
    classes = 'CodeEditor cm-s-material-palenight';
  } else {
    classes = opts.dark ? 'cm-s-tomorrow-night' : 'cm-s-neo';
  }

  return React.createElement(
    'div',
    { className: classes },
    codemirror(typeof code === 'string' ? code : '', lang, opts)
  );
};

module.exports.uppercase = require('./utils/uppercase');
