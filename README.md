# @readme/syntax-highlighter

ReadMe's React-based syntax highlighter based on [CodeMirror][codemirror] and [react-codemirror2][react-codemirror]

[![npm](https://img.shields.io/npm/v/@readme/syntax-highlighter)](https://npm.im/@readme/syntax-highlighter) [![Build](https://github.com/readmeio/syntax-highlighter/workflows/CI/badge.svg)](https://github.com/readmeio/syntax-highlighter)

[![](https://raw.githubusercontent.com/readmeio/.github/main/oss-header.png)](https://readme.io)

## Installation

```
npm install --save @readme/syntax-highlighter
```

## Usage

### Read Only Mode

```js
const syntaxHighlighter = require('@readme/syntax-highlighter');
const ele = syntaxHighlighter('console.log("Hello, world!");', 'js');
```

### Read Only with Line Numbers

```js
const syntaxHighlighter = require('@readme/syntax-highlighter');
const ele = syntaxHighlighter('console.log("Hello, world!");', 'js', { ...opts, highlightMode: true });
```

### Read Only with Line Numbers and Highlighted Ranges

```js
const syntaxHighlighter = require('@readme/syntax-highlighter');
const ele = syntaxHighlighter('console.log("Hello, world!");', 'js', {
  ...opts,
  highlightMode: true,
  ranges: [
    [
      { ch: 0, line: 0 },
      { ch: 0, line: 1 },
    ],
  ],
});
```

### Full CodeMirror

Access to a full code Mirror instance. See configuration settings in the [`react-codemirror2` library][react-codemirror#props]

```js
const syntaxHighlighter = require('@readme/syntax-highlighter');
const ele = syntaxHighlighter('console.log("Hello, world!");', 'js', { ...opts, editable: true }, { ...editorProps });
```

### Available Options

<!-- prettier-ignore-start -->
| Name | Type | Description |
| :--- | :--- | :--- |
| `customTheme` | String | Highlighting theme. One of `neo`, `material-palenight`, or `tomorrow-night`. (Setting this will override the `dark` mode option.)
| `dark` | Boolean | Enable dark mode. |
| `editable` | Boolean | Enable the full CodeMirror instance |
| `highlightMode` | Boolean | Enable line number display. |
| `inline` | String | Wrap code in a `<span>` tag, instead of a `<div>`. |
| `ranges` | Array | Ranges of line numbers to apply highlighting to. Requires `highlightMode` enabled |
| `tokenizeVariables` | Boolean | Match and render [ReadMe variables](rdme-variable) in your markdown. |
<!-- prettier-ignore-end -->

## Languages Supported

<!-- prettier-ignore-start -->
| Language | Available language mode(s) |
| :--- | :--- |
| ASP.NET | `asp`, `aspx` |
| C | `c` |
| C++ | `c++`, `cpp`, `cplusplus` |
| C# | `cs`, `csharp` |
| Clojure | `clj`, `cljc`, `cljx`, `clojure` |
| CSS | `css`, `less`, `sass`, `scss`, `styl`, `stylus` |
| cURL | `curl` |
| D | `d` |
| Dart | `dart` |
| Docker | `dockerfile` |
| Erlang | `erl`, `erlang` |
| Go | `go` |
| GraphQL | `gql`, `graphql` |
| Groovy | `gradle`, `groovy` |
| Handlebars | `handlebars`, `hbs` |
| HTML/XML | `html`, `xhtml`, `xml` |
| HTTP | `http` |
| Java | `java` |
| JavaScript | `coffeescript`, `ecmascript`, `javascript`, `js`, `jsx`, `node` |
| JSON | `json` |
| Julia | `jl`, `julia` |
| Kotlin | `kotlin`, `kt` |
| Liquid | `liquid` |
| Markdown | `markdown` |
| Objective-C | `objc`, `objectivec`,  |
| Objective-C++ | `objc++`, `objcpp`, `objectivecpp`, `objectivecplusplus`,  |
| OCaml | `ocaml`, `ml` |
| Perl | `perl`, `pl` |
| PHP | `php` |
| PowerShell | `powershell`, `ps1` |
| Python | `py`, `python` |
| R | `r` |
| React | `jsx` |
| Ruby | `jruby`, `macruby`, `rake`, `rb`, `rbx`, `ruby` |
| Rust | `rs`, `rust` |
| Scala | `scala` |
| Shell | `bash`, `sh`, `shell`, `zsh` |
| SQL | `cql`, `mssql`, `mysql`, `plsql`, `postgres`, `postgresql`, `pgsql`, `sql`, `sqlite` |
| Swift | `swift` |
| TOML | `toml` |
| TypeScript | `ts`, `typescript` |
| YAML | `yaml`, `yml` |
<!-- prettier-ignore-end -->

[rdme-variable]: https://github.com/readmeio/api-explorer/tree/next/packages/variable
[codemirror]: https://github.com/codemirror/CodeMirror
[react-codemirror]: https://github.com/scniro/react-codemirror2
[react-codemirror#props]: https://github.com/scniro/react-codemirror2#props
