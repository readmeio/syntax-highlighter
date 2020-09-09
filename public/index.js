import React from 'react';
import ReactDOM from 'react-dom';
import syntaxHighlighter from '../src/index';

ReactDOM.render(
  <div>
    <h1>Core Syntax Highlighter</h1>
    <pre id="hub-reference">
      {syntaxHighlighter(
        `curl --request POST
        --url http://petstore.swagger.io/v2/pet
        --header 'authorization: Bearer 123'
        --header 'content-type: application/json'`,
        'curl',
        { dark: true, highlightMode: true }
      )}
    </pre>
    <hr />
    <h1>Code Editor</h1>
    <pre id="hub-reference">
      {syntaxHighlighter(
        `curl --request POST
        --url http://petstore.swagger.io/v2/pet
        --header 'authorization: Bearer 123'
        --header 'content-type: application/json'`,
        'curl',
        { editable: true, dark: true }
      )}
    </pre>
  </div>,
  document.getElementById('root')
);
