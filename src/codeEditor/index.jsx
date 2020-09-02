const React = require('react');
const PropTypes = require('prop-types');
const { Controlled: CodeMirror } = require('react-codemirror2');

const { getMode } = require('../utils/modes');
const defaults = require('./cm.options');
require('./style.scss');

const { useEffect, useState } = React;

const CodeEditor = ({ className, code = '', lang, options = {}, children, ...attr }) => {
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
    <div className="CodeEditor">
      <CodeMirror
        {...attr}
        onBeforeChange={(editor, data, updatedCode) => setValue(updatedCode)}
        options={{ ...defaults, ...options, mode }}
        value={value}
      />
    </div>
  );
};

CodeEditor.propTypes = {
  children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  /** Code to show in the editor.
   */
  code: PropTypes.string,
  /** CodeMirror language mode to use.
   */
  lang: PropTypes.string,
  /** Custom CodeMirror  configuration.
   */
  options: PropTypes.object,
  /** Syntax highlighting theme.
   */
  theme: PropTypes.oneOf(['light', 'dark']),
};

CodeEditor.defaultProps = {
  options: {},
  theme: 'dark',
};

module.exports = CodeEditor;
