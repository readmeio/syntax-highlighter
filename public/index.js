import React from 'react';
import ReactDOM from 'react-dom';
import syntaxHighlighter from "../src/index.js";

ReactDOM.render(
  syntaxHighlighter(
    'console.log("Hello, world!");',
    'js',
    { dark: true }
  ),
  document.getElementById('core-root')
);
