import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { getMode } from '../utils/modes';
import defaults from './cm.options';
import '../utils/cm-mode-imports';
import './style.scss';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    const { children, code, lang } = this.props;

    this.state = {
      value: children && typeof children === 'string' ? children : code,
      mode: getMode(lang),
    };
  }

  setValue(updatedCode) {
    this.setState({
      value: updatedCode,
    });
  }

  render() {
    const { className, code, lang, options, children, theme, ...attr } = this.props;
    const { mode, value } = this.state;

    return (
      <CodeMirror
        {...attr}
        className="CodeEditor"
        onBeforeChange={(editor, data, updatedCode) => this.setValue(updatedCode)}
        options={{ ...defaults, ...options, mode, theme }}
        value={value}
      />
    );
  }
}

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
