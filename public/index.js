import React from 'react';
import ReactDOM from 'react-dom';
import syntaxHighlighter, { CodeEditor } from '../src/index';

ReactDOM.render(
  <div>
    <h1>Core Syntax Highlighter</h1>
    {syntaxHighlighter('console.log("Hello, world!");', 'js', { dark: true })}
    <hr />
    <h1>Code Editor</h1>
    <CodeEditor />
  </div>
  ,
  document.getElementById('root')
);
