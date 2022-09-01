import React from 'react';
import ReactDOM from 'react-dom';

import syntaxHighlighter, { cmVariableContext } from '../src/index';

const exampleCode = `curl --request POST
  --url <<url>>
  --header 'authorization: Bearer 123'
  --header 'content-type: application/json'`;

const exampleJson = `{
    "key": "value",
    "array": [1, 2, 3],
    "a": {
      "b": {
        "c": {
          "d": "ok",
          "e": "err"
        },
        "f": {
          "g": "ok"
        },
        "h": {
          "i": "ok"
        }
      },
      "j": {
        "k": {
          "l": "ok"
        }
      }
    },
    "isThing": true
  }
  `;

ReactDOM.render(
  <div style={{ margin: '20px' }}>
    <h1>Core Syntax Highlighter</h1>

    <h2>Dark Theme</h2>
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
        {syntaxHighlighter(exampleCode, 'curl', {
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
        })}
      </cmVariableContext.Provider>
    </pre>

    <h2>Light Theme</h2>
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
        {syntaxHighlighter(exampleCode, 'curl', {
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
        })}
      </cmVariableContext.Provider>
    </pre>

    <hr />
    <h1>Code Editor</h1>
    <h2>Dark Theme</h2>
    <pre id="hub-reference">{syntaxHighlighter(exampleCode, 'curl', { editable: true, dark: true })}</pre>

    <h2>Light Theme</h2>
    <pre id="hub-reference">{syntaxHighlighter(exampleCode, 'curl', { editable: true, dark: false })}</pre>

    <hr />
    <h1>Code Folding</h1>
    <h2>Dark Theme</h2>
    <pre id="hub-reference">
      {syntaxHighlighter(exampleJson, 'json', { foldGutter: true, readOnly: true, dark: true })}
    </pre>

    <h2>Light Theme</h2>
    <pre id="hub-reference">
      {syntaxHighlighter(exampleJson, 'json', { foldGutter: true, readOnly: true, dark: false })}
    </pre>
  </div>,
  document.getElementById('root')
);
