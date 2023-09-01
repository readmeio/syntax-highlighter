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

const exampleMarkdown = `# Custom Scrollbars

This is a piece of text that creates scrollbars

Lorem ipsum dolor sit amet, turpis nec facilisis neque vestibulum adipiscing, magna nunc est luctus orci a,
aliquam duis ad volutpat nostra. Vestibulum ultricies suspendisse commodo volutpat pede sed. Bibendum odio
dignissim, ad vitae mollis ac sed nibh quis, suspendisse diam, risus quas blandit phasellus luctus nec,
integer nunc vitae posuere scelerisque. Lobortis quam porta conubia nulla. Et nisl ac, imperdiet vitae ac.
Parturient sit. Et vestibulum euismod, rutrum nunc libero mauris purus convallis. Cum id adipiscing et eget
pretium rutrum, ultrices sapien magnis fringilla sit lorem, eu vitae scelerisque ipsum aliquet, magna sed
fusce vel.

Lectus ultricies libero dolor convallis, sed etiam vel hendrerit egestas viverra, at urna mauris, eget
vulputate dolor voluptatem, nulla eget sollicitudin. Sed tincidunt, elit sociis. Mattis mi tortor dui id
sodales mi, maecenas nam fringilla risus turpis mauris praesent, imperdiet maecenas ultrices nonummy tellus
quis est. Scelerisque nec pharetra quis varius fringilla. Varius vestibulum non dictum pharetra, tincidunt in
vestibulum iaculis molestie, id condimentum blandit elit urna magna pulvinar, quam suspendisse pellentesque
donec. Vel amet ad ac. Nec aut viverra, morbi mi neque massa, turpis enim proin. Tellus eu, fermentum velit
est convallis aliquam velit, rutrum in diam lacus, praesent tempor pellentesque dictum semper augue. Felis
explicabo massa amet lectus phasellus dolor. Ut lorem quis arcu neque felis ultricies, senectus vitae
curabitur sed pellentesque et, id sed risus in sed ac accumsan, blandit arcu quam duis nunc.

Sed leo sollicitudin odio vitae, purus sit egestas, justo eros inceptos auctor fermentum lectus. Ligula luctus
turpis, quod massa vitae elementum orci, nullam fringilla elit tortor. Justo ante tempor amet quam posuere
volutpat. Facilisis pede erat ut hac ultrices ipsum, wisi duis sit metus. Dolor vitae est sed sed vitae. Sed
eu ligula, morbi vestibulum nunc nibh velit ut taciti, ligula elit semper sagittis in, auctor arcu vel eget.
Mauris at vitae nec suspendisse et, aenean proin blandit suscipit. Morbi quam, dolor ultricies. Viverra
tempus. Suspendisse sit dapibus, ac fuga aenean, magna nisl nonummy augue posuere, dictum ut fuga velit
parturient augue interdum, mattis sit tellus.

Vehicula commodo tempus curabitur eros, lacinia erat vulputate lorem vel fermentum donec, lectus sed conubia
id pellentesque. Vel senectus donec pede aliquet dolor sit, nec vivamus justo placerat interdum maecenas,
sodales euismod. Quis netus sapien amet, vestibulum quam nec amet lacinia, quis aliquet, tempor vivamus tellus
enim, suscipit quis eleifend. Amet class phasellus orci pretium, risus in nulla. Neque sit ullamcorper,
ultricies platea id nec suspendisse ac. Et elementum. Dictum nam, ut dui fermentum egestas facilisis elit
augue, adipiscing donec ipsum erat nam pellentesque convallis, vestibulum vestibulum risus id nulla ut mauris,
curabitur aute aptent. Ultrices orci wisi dui ipsum praesent, pharetra felis eu quis. Est fringilla etiam,
maxime sem dapibus et eget, mi enim dignissim nec pretium, augue vehicula, volutpat proin. Et occaecati
lobortis viverra, cum in sed, vivamus tellus. Libero at malesuada est vivamus leo tortor.`;

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
    <pre id="hub-reference">
      {syntaxHighlighter(exampleMarkdown, 'md', { scrollbarStyle: 'overlay', editable: true, dark: true })}
    </pre>

    <h2>Light Theme</h2>
    <pre id="hub-reference">
      {syntaxHighlighter(exampleMarkdown, 'md', { scrollbarStyle: 'overlay', editable: true, dark: false })}
    </pre>

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
  document.getElementById('root'),
);
