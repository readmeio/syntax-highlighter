import React from 'react';
import codemirror, { VariablesContext as cmVariableContext } from './codeMirror';
import codeEditor from './codeEditor';
import uppercase from './utils/uppercase';
import canonical from './utils/canonical';
import { modes } from './utils/modes';

const SyntaxHighlighter = (
  code,
  lang,
  opts = {
    // If `customTheme` is present, it will override the `dark` option.
    className: '',
    customTheme: false,
    dark: false,
    tokenizeVariables: false,
    editable: false,
  },
  editorProps = {}
) => {
  let theme = opts.dark ? 'material-palenight' : 'neo';
  if (opts.customTheme) {
    theme = opts.customTheme;
  }

  if (opts.editable) {
    return React.createElement(codeEditor, {
      ...editorProps,
      code,
      lang,
      theme,
    });
  }

  const classes = [`cm-s-${theme} ${opts.className ? opts.className : ''}`];
  if (opts.highlightMode) {
    classes.push('CodeEditor');
  }

  return React.createElement(
    'div',
    { className: classes.join(' ') },
    codemirror(typeof code === 'string' ? code : '', lang, opts)
  );
};

export default SyntaxHighlighter;
export { uppercase, canonical, modes, cmVariableContext };
