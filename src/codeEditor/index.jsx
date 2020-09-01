const React = require('react');
const { Controlled: CodeMirror } = require('react-codemirror2');

module.exports = () => {
  const options = {
    mode: 'javascript',
    theme: 'material-palenight',
    tabSize: 2,
    lineNumbers: true,
  };
  const code = 'console.log()';
  return (
    <div>
      <CodeMirror
        theme={'dark'}
        options={options}
        value={code}
      />
    </div>
  );
};
