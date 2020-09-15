# @readme/syntax-highlighter

ReadMe's React-based syntax highlighter based on [CodeMirror](https://github.com/codemirror/CodeMirror) and [react-codemirror2](https://github.com/scniro/react-codemirror2).

[![npm](https://img.shields.io/npm/v/@readme/syntax-highlighter)](https://npm.im/@readme/syntax-highlighter) [![Build](https://github.com/readmeio/syntax-highlighter/workflows/CI/badge.svg)](https://github.com/readmeio/syntax-highlighter)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)

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
Access to a full code Mirror instance. See configuration settings in the [react-codemirror2 library](https://github.com/scniro/react-codemirror2#props)

```js
const syntaxHighlighter = require('@readme/syntax-highlighter');
const ele = syntaxHighlighter('console.log("Hello, world!");', 'js', { ...opts, editable: true }, { ...editorProps });
```

### Available Options
| Name | Type | Description |
| :--- | :--- | :--- |
| dark | boolean | Enable Dark Mode? |
| highlightMode | boolean | Enable line number display and ability to set highlighted line css |
| tokenizeVariables | boolean | Apply [Variable Component](https://github.com/readmeio/api-explorer/tree/next/packages/variable) to matched Regex |
| ranges | array | Ranges of line numbers to apply highlighting to. Requires `highlightMode` enabled |
| editable | boolean | Enable full CodeMirror Instance |

## Languages Supported

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
| Groovy | `gradle`, `groovy` |
| Handlebars | `handlebars`, `hbs` |
| HTML/XML | `html`, `xhtml`, `xml` |
| HTTP | `http` |
| Java | `java` |
| JavaScript | `coffeescript`, `ecmascript`, `javascript`, `js`, `node` |
| JSON | `json` |
| Julia | `jl`, `julia` |
| Kotlin | `kotlin`, `kt` |
| Liquid | `liquid` |
| Markdown | `markdown` |
| Objective-C | `objc`, `objectivec`,  |
| Objective-C++ | `objc++`, `objcpp`, `objectivecpp`, `objectivecplusplus`,  |
| Perl | `perl`, `pl` |
| PHP | `php` |
| PowerShell | `powershell`, `ps1` |
| Python | `py`, `python` |
| Ruby | `jruby`, `macruby`, `rake`, `rb`, `rbx`, `ruby` |
| Rust | `rs`, `rust` |
| Scala | `scala` |
| Shell | `bash`, `sh`, `shell`, `zsh` |
| SQL | `cql`, `mssql`, `mysql`, `plsql`, `postgres`, `postgresql`, `pgsql`, `sql`, `sqlite` |
| Swift | `swift` |
| TypeScript | `ts`, `typescript` |
| YAML | `yaml`, `yml` |
