import React from 'react';

import codeEditor from './codeEditor';
import codemirror, { VariablesContext as cmVariableContext } from './codeMirror';
import canonical from './utils/canonical';
import { modes } from './utils/modes';
import uppercase from './utils/uppercase';

const SyntaxHighlighter = (
  code,
  lang,
  opts = {
    // If `customTheme` is present, it will override the `dark` option.
    className: '',
    customTheme: false,
    dark: false,
    editable: false,
    inline: false,
    tokenizeVariables: false,
  },
  props = {},
) => {
  // eslint-disable-next-line react/prop-types
  const { mdx, ...editorProps } = props;
  let theme = opts.dark ? 'material-palenight' : 'neo';
  if (opts.customTheme) {
    theme = opts.customTheme;
  }

  if (opts.foldGutter) {
    // `foldGutter` does not work with runmode and has to be done with the codeEditor component
    // NOTE: To disable editing, to still allow folding, `readOnly` must be `true`.
    opts.editable = true;
    // Default CSS classes
    opts.gutters = ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'];
  }

  if (opts.editable) {
    return React.createElement(codeEditor, {
      ...editorProps,
      code,
      lang,
      theme,
      options: opts,
    });
  }

  const classes = [`cm-s-${theme}`];
  if (opts.className) {
    classes.push(opts.className);
  }

  if (opts.highlightMode) {
    classes.push('CodeEditor');
  }

  const wrapper = opts.inline ? 'span' : 'div';

  return React.createElement(
    wrapper,
    { className: classes.join(' '), 'data-testid': 'SyntaxHighlighter' },
    codemirror(typeof code === 'string' ? code : '', lang, opts, { mdx }),
  );
};

export default SyntaxHighlighter;
export { uppercase, canonical, modes, cmVariableContext };
