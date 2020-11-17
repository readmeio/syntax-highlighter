import React from 'react';
import ReactDOM from 'react-dom';
import syntaxHighlighter, { cmVariableContext } from '../src/index';

ReactDOM.render(
  <div>
    <h1>Core Syntax Highlighter (Dark Theme)</h1>
    <pre id="hub-reference">
      <cmVariableContext.Provider
        value={{
          user: {},
          defaults: [
            {
              name: 'url',
              default: 'GET',
            },
          ],
        }}
      >
        {syntaxHighlighter(
          `curl --request POST
          --url <<url>>
          --header 'authorization: Bearer 123'
          --header 'content-type: application/json'`,
          'curl',
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
                { ch: 0, line: 4 },
                { ch: 0, line: 5 },
              ],
            ],
          }
        )}
      </cmVariableContext.Provider>
    </pre>
    <hr />
    <h1>Core Syntax Highlighter (Light Theme)</h1>
    <pre id="hub-reference">
      <cmVariableContext.Provider
        value={{
          user: {},
          defaults: [
            {
              name: 'url',
              default: 'GET',
            },
          ],
        }}
      >
        {syntaxHighlighter(
          `curl --request POST
          --url <<url>>
          --header 'authorization: Bearer 123'
          --header 'content-type: application/json'`,
          'curl',
          {
            dark: false,
            highlightMode: true,
            tokenizeVariables: true,
            ranges: [
              [
                { ch: 0, line: 0 },
                { ch: 0, line: 1 },
              ],
              [
                { ch: 0, line: 4 },
                { ch: 0, line: 5 },
              ],
            ],
          }
        )}
      </cmVariableContext.Provider>
    </pre>
    <hr />
    <h1>Code Editor (Dark Theme)</h1>
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
    <hr />
    <h1>Code Editor (Light Theme)</h1>
    <pre id="hub-reference">
      {syntaxHighlighter(
        `curl --request POST
        --url http://petstore.swagger.io/v2/pet
        --header 'authorization: Bearer 123'
        --header 'content-type: application/json'`,
        'curl',
        { editable: true, dark: false }
      )}
    </pre>
  </div>,
  document.getElementById('root')
);
