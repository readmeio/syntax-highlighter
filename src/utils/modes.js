// This is a mapping of languages that we support, but aren't directly loading the mode extension
// Within `/src/codeMirror/index.jsx` and /src/codeEditor.index.jsx
//
// This list also includes a number of language aliases, as because of the way we're using
// `CodeMirror.runMode` we can't take advantage of its known aliases in the mode extensions that
// we're loading.
//
// There are 2 types of lookup, single and array. e.g. `html` needs to be rendered using
// `htmlmixed`, but `java`, needs to be rendered using the `clike` mode.
//
const modes = {
  asp: 'clike',
  aspx: 'clike',
  bash: 'shell',
  c: 'clike',
  'c#': ['clike', 'text/x-csharp'],
  'c++': ['clike', 'text/x-c++src'],
  clj: 'clojure',
  cljc: 'clojure',
  cljx: 'clojure',
  coffeescript: 'javascript',
  cplusplus: ['clike', 'text/x-c++src'],
  cpp: ['clike', 'text/x-c++src'],
  cql: ['sql', 'text/x-cassandra'],
  cs: ['clike', 'text/x-csharp'],
  csharp: ['clike', 'text/x-csharp'],
  curl: 'shell',
  d: 'd',
  diff: 'diff',
  ecmascript: 'javascript',
  erl: 'erlang',
  go: ['go', 'text/x-go'],
  gradle: 'groovy',
  gql: 'graphql',
  handlebars: 'htmlmixed',
  hbs: 'htmlmixed',
  html: 'htmlmixed',
  java: ['clike', 'text/x-java'],
  jl: 'julia',
  js: 'javascript',
  jsx: 'jsx',
  json: ['javascript', 'application/ld+json'],
  jruby: 'ruby',
  kotlin: ['clike', 'text/x-kotlin'],
  kt: ['clike', 'text/x-kotlin'],
  less: 'css',
  liquid: 'htmlmixed',
  node: 'javascript',
  macruby: 'ruby',
  markdown: 'gfm',
  ml: ['mllike', 'text/x-ocaml'],
  mssql: ['sql', 'text/x-mssql'],
  mysql: ['sql', 'text/x-mysql'],
  objc: ['clike', 'text/x-objectivec'],
  'objc++': ['clike', 'text/x-objectivec++'],
  objcpp: ['clike', 'text/x-objectivec++'],
  objectivec: ['clike', 'text/x-objectivec'],
  objectivecpp: ['clike', 'text/x-objectivec++'],
  objectivecplusplus: ['clike', 'text/x-objectivec++'],
  ocaml: ['mllike', 'text/x-ocaml'],
  php: ['php', 'text/x-php'],
  pgsql: ['sql', 'text/x-pgsql'],
  pl: 'perl',
  plsql: ['sql', 'text/x-plsql'],
  postgres: ['sql', 'text/x-pgsql'],
  postgresql: ['sql', 'text/x-pgsql'],
  ps1: 'powershell',
  py: 'python',
  r: 'r',
  rake: 'ruby',
  rb: 'ruby',
  rbx: 'ruby',
  rs: 'rust',
  sass: 'css',
  scala: ['clike', 'text/x-scala'],
  scss: 'css',
  sh: 'shell',
  sol: 'clike',
  solidity: 'clike',
  sql: ['sql', 'text/x-sql'],
  sqlite: ['sql', 'text/x-sqlite'],
  styl: 'css',
  stylus: 'css',
  text: ['null', 'text/plain'],
  ts: ['javascript', 'text/typescript'],
  typescript: ['javascript', 'text/typescript'],
  xhtml: 'htmlmixed',
  yml: 'yaml',
  zsh: 'shell',
};

function getMode(lang) {
  let mode = lang;
  if (mode in modes) {
    mode = modes[mode];
    if (Array.isArray(mode)) {
      [, mode] = mode;
    }
  }

  return mode;
}

module.exports = { modes, getMode };
