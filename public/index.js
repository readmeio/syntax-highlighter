import React from 'react';
import ReactDOM from 'react-dom';
import syntaxHighlighter from '../src/index';

ReactDOM.render(
  <div>
    <h1>Core Syntax Highlighter</h1>
    <pre id="hub-reference">
      {syntaxHighlighter(
        `const request = require('request');\n\n\nconst options = {\n  method: 'GET',\n  url: 'http://petstore.swagger.io/api/pets',\n  headers: {accept: 'application/json'}\n\n};\n\nrequest(options, function (error, response, body) {\n  if (error) throw new Error(error);\n\n  console.log(body);\n});`,
        'javascript',
        {
          dark: true,
          highlightMode: true,
          tokenizeVariables: true,
          ranges: [
            [
              { ch: 0, line: 0 },
              { ch: 0, line: 1 },
            ],
            [
              { ch: 0, line: 2 },
              { ch: 0, line: 3 },
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
