import React from 'react';
import ReactDOM from 'react-dom';
import syntaxHighlighter, { cmVariableContext } from '../src/index';

const exampleCode = `curl --request POST
  --url <<url>>
  --header 'authorization: Bearer 123'
  --header 'content-type: application/json'`;

ReactDOM.render(
  <div>
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

    <h2>Custom Theme: tomorrow-night</h2>
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
          customTheme: 'tomorrow-night',
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

    <h2>Custom Theme: tomorrow-night</h2>
    <pre id="hub-reference">
      {syntaxHighlighter(exampleCode, 'curl', { editable: true, customTheme: 'tomorrow-night' })}
    </pre>
  </div>,
  document.getElementById('root')
);
