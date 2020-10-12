import React from 'react';
import codemirror, { VariablesContext as cmVariableContext } from './codeMirror';
import codeEditor from './codeEditor';
import uppercase from './utils/uppercase';
import canonical from './utils/canonical';
import { modes } from './utils/modes';

const SyntaxHighlighter = (
  code,
  lang,
  opts = { dark: false, tokenizeVariables: false, editable: false },
  editorProps = {}
) => {
  if (opts.editable) {
    return React.createElement(codeEditor, {
      ...editorProps,
      code,
      lang,
    });
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

export default SyntaxHighlighter;
export { uppercase, canonical, modes, cmVariableContext };
