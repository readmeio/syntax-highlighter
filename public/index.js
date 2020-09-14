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
        {
          dark: true,
          highlightMode: true,
          ranges: [
            [
              { ch: 0, line: 0 },
              { ch: 0, line: 1 },
            ],
            [
              { ch: 0, line: 3 },
              { ch: 0, line: 5 },
            ],
          ],
        }
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
