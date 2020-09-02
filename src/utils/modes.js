// This is a mapping of languages that we support, but aren't directly loading the mode extension
// for within `codemirror.jsx`.
//
// This list also includes a number of language aliases, as because of the way we're using
// `CodeMirror.runMode` we can't take advantage of its known aliases in the mode extensions that
// we're loading.
//
// There are 2 types of lookup, single and array. e.g. `html` needs to be rendered using
// `htmlmixed`, but `java`, needs to be rendered using the `clike` mode.
//
// We also have the mimeType to potentially in future load in new types dynamically.
require('codemirror/mode/clike/clike');
require('codemirror/mode/clojure/clojure');
require('codemirror/mode/d/d');
require('codemirror/mode/dart/dart');
require('codemirror/mode/diff/diff');
require('codemirror/mode/dockerfile/dockerfile');
require('codemirror/mode/erlang/erlang');
require('codemirror/mode/go/go');
require('codemirror/mode/groovy/groovy');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/http/http');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/julia/julia');
require('codemirror/mode/perl/perl');
require('codemirror/mode/php/php');
require('codemirror/mode/powershell/powershell');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/rust/rust');
require('codemirror/mode/shell/shell');
require('codemirror/mode/sql/sql');
require('codemirror/mode/swift/swift');
require('codemirror/mode/yaml/yaml');

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
  handlebars: 'htmlmixed',
  hbs: 'htmlmixed',
  html: 'htmlmixed',
  java: ['clike', 'text/x-java'],
  jl: 'julia',
  js: 'javascript',
  json: ['javascript', 'application/ld+json'],
  jruby: 'ruby',
  kotlin: ['clike', 'text/x-kotlin'],
  kt: ['clike', 'text/x-kotlin'],
  less: 'css',
  liquid: 'htmlmixed',
  node: 'javascript',
  macruby: 'ruby',
  markdown: 'gfm',
  mssql: ['sql', 'text/x-mssql'],
  mysql: ['sql', 'text/x-mysql'],
  objc: ['clike', 'text/x-objectivec'],
  'objc++': ['clike', 'text/x-objectivec++'],
  objcpp: ['clike', 'text/x-objectivec++'],
  objectivec: ['clike', 'text/x-objectivec'],
  objectivecpp: ['clike', 'text/x-objectivec++'],
  objectivecplusplus: ['clike', 'text/x-objectivec++'],
  php: ['php', 'text/x-php'],
  pgsql: ['sql', 'text/x-pgsql'],
  pl: 'perl',
  plsql: ['sql', 'text/x-plsql'],
  postgres: ['sql', 'text/x-pgsql'],
  postgresql: ['sql', 'text/x-pgsql'],
  ps1: 'powershell',
  py: 'python',
  rake: 'ruby',
  rb: 'ruby',
  rbx: 'ruby',
  rs: 'rust',
  sass: 'css',
  scala: ['clike', 'text/x-scala'],
  scss: 'css',
  sh: 'shell',
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
