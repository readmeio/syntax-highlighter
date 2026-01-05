import type { ICodeMirror } from 'react-codemirror2';

import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import '../utils/cm-mode-imports';
import { getMode } from '../utils/modes';

import defaults from './cm.options';
import './style.scss';

const CodeEditor: React.FC<{
  children?: string;
  className?: string;
  code?: string;
  lang?: string;
  options?: ICodeMirror['options'];
  theme?: 'material-palenight' | 'neo' | 'tomorrow-night';
}> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className = '', // unused, I think on purpose? but not sure
  code = '',
  lang,
  options = {},
  children,
  theme = 'material-palenight',
  ...attr
}) => {
  const [value, setValue] = useState(children && typeof children === 'string' ? children : code);
  const [mode, setMode] = useState(getMode(lang as string));

  useEffect(() => {
    const incValue = children && typeof children === 'string' ? children : code;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- @fixme
    setValue(incValue);
  }, [code, children]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- @fixme
    setMode(prevMode => {
      const newMode = getMode(lang as string);
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
      value={value as string}
    />
  );
};

export default CodeEditor;
