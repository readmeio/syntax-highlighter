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
  const theme = opts.dark ? 'material-palenight' : 'neo';

  if (opts.editable) {
    return React.createElement(codeEditor, {
      ...editorProps,
      code,
      lang,
      theme,
    });
  }

  let classes = '';
  if (opts.highlightMode) classes = `CodeEditor cm-s-${theme}`;

  return React.createElement(
    'div',
    { className: classes },
    codemirror(typeof code === 'string' ? code : '', lang, opts)
  );
};

export default SyntaxHighlighter;
export { uppercase, canonical, modes, cmVariableContext };
