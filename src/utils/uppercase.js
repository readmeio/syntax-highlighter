const codeTypes = {
  asp: 'ASP.NET',
  aspx: 'ASP.NET',
  bash: 'Bash',
  c: 'C',
  'c#': 'C#',
  'c++': 'C++',
  coffeescript: 'CoffeeScript',
  clj: 'Clojure',
  cljc: 'Clojure',
  cljx: 'Clojure',
  clojure: 'Clojure',
  cplusplus: 'C++',
  cpp: 'C++',
  cql: 'Cassandra',
  cs: 'C#',
  csharp: 'C#',
  css: 'CSS',
  curl: 'cURL',
  d: 'D',
  dart: 'Dart',
  diff: 'Diff',
  dockerfile: 'Dockerfile',
  ecmascript: 'ECMAScript',
  erl: 'Erlang',
  erlang: 'Erlang',
  go: 'Go',
  gql: 'GraphQL',
  gradle: 'Gradle',
  graphql: 'GraphQL',
  groovy: 'Groovy',
  handlebars: 'Handlebars',
  hbs: 'Handlebars',
  haml: 'HAML',
  haxe: 'Haxe',
  html: 'HTML',
  http: 'HTTP',
  java: 'Java',
  javascript: 'JavaScript',
  jinja2: 'Jinja2',
  jl: 'Julia',
  jruby: 'JRuby',
  js: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  julia: 'Julia',
  kotlin: 'Kotlin',
  kt: 'Kotlin',
  less: 'LESS',
  liquid: 'Liquid',
  lua: 'Lua',
  macruby: 'MacRuby',
  markdown: 'Markdown',
  md: 'Markdown',
  mermaid: 'Mermaid', // syntax highlighting not supported yet
  ml: 'OCaml',
  mssql: 'SQL Server',
  mysql: 'MySQL',
  node: 'Node',
  objc: 'Objective-C',
  'objc++': 'Objective-C++',
  objcpp: 'Objective-C++',
  objectivec: 'Objective-C',
  objectivecpp: 'Objective-C++',
  objectivecplusplus: 'Objective-C++',
  ocaml: 'OCaml',
  perl: 'Perl',
  php: 'PHP',
  pl: 'Perl',
  pgsql: 'PL/pgSQL',
  plsql: 'PL/SQL',
  postgres: 'PostgreSQL',
  postgresql: 'PostgreSQL',
  powershell: 'PowerShell',
  ps1: 'PowerShell',
  python: 'Python',
  py: 'Python',
  r: 'R',
  rake: 'Rake',
  rb: 'Ruby',
  rbx: 'Rubinius',
  rs: 'Rust',
  ruby: 'Ruby',
  rust: 'Rust',
  sass: 'Sass',
  scala: 'Scala',
  scss: 'SCSS',
  sh: 'Shell',
  shell: 'Shell',
  smarty: 'Smarty',
  solidity: 'Solidity',
  sql: 'SQL',
  sqlite: 'SQLite',
  stylus: 'Stylus',
  styl: 'Stylus',
  swift: 'Swift',
  text: 'Text',
  toml: 'TOML',
  twig: 'Twig',
  typescript: 'TypeScript',
  xhtml: 'XHTML',
  xml: 'XML',
  yaml: 'YAML',
  yml: 'YAML',
  zsh: 'Zsh',
};

module.exports = function uppercase(language) {
  if (language in codeTypes) return codeTypes[language];
  return language;
};
