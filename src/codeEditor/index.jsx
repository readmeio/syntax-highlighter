import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import '../utils/cm-mode-imports';
import { getMode } from '../utils/modes';

import defaults from './cm.options';
import './style.scss';

const CodeEditor = ({ className, code, lang, options, children, theme, ...attr }) => {
  const [value, setValue] = useState(children && typeof children === 'string' ? children : code);
  const [mode, setMode] = useState(getMode(lang));

  useEffect(() => {
    const incValue = children && typeof children === 'string' ? children : code;
    setValue(incValue);
  }, [code, children]);

  useEffect(() => {
    setMode(prevMode => {
      const newMode = getMode(lang);
      if (newMode !== prevMode) return newMode;
      return prevMode;
    });
  }, [lang]);

  return (
    <CodeMirror
      {...attr}
      className="CodeEditor"
      onBeforeChange={(editor, data, updatedCode) => setValue(updatedCode)}
      options={{ ...defaults, ...options, mode, theme }}
      value={value}
    />
  );
};

CodeEditor.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  /** Code to show in the editor.
   */
  code: PropTypes.string,
  /** CodeMirror language mode to use.
   */
  lang: PropTypes.string,
  /** Custom CodeMirror configuration.
   */
  options: PropTypes.object,
  /** Syntax highlighting theme.
   */
  theme: PropTypes.oneOf(['neo', 'material-palenight', 'tomorrow-night']),
};

CodeEditor.defaultProps = {
  className: '',
  code: '',
  options: {},
  theme: 'material-palenight',
};

export default CodeEditor;
