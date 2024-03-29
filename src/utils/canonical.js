const modeAliases = {
  aspx: 'asp',
  bash: 'shell',
  'c++': 'cplusplus',
  'c#': 'csharp',
  clj: 'clojure',
  cljc: 'clojure',
  cljx: 'clojure',
  coffeescript: 'javascript',
  cpp: 'cplusplus',
  cql: 'sql',
  cs: 'csharp',
  docker: 'dockerfile',
  ecmascript: 'javascript',
  erl: 'erlang',
  gql: 'graphql',
  gradle: 'groovy',
  handlebars: 'html',
  hbs: 'html',
  jl: 'julia',
  jruby: 'ruby',
  js: 'javascript',
  kt: 'kotlin',
  less: 'css',
  macruby: 'ruby',
  md: 'markdown',
  ml: 'ocaml',
  mssql: 'sql',
  mysql: 'sql',
  node: 'javascript',
  'obj-c': 'objectivec',
  'obj-c++': 'objectivecplusplus',
  'objc++': 'objectivecplusplus',
  objc: 'objectivec',
  objcpp: 'objectivecplusplus',
  objectivecpp: 'objectivecplusplus',
  pgsql: 'sql',
  pl: 'perl',
  plsql: 'sql',
  postgres: 'sql',
  postgresql: 'sql',
  ps1: 'powershell',
  py: 'python',
  rake: 'ruby',
  rb: 'ruby',
  rbx: 'ruby',
  rs: 'rust',
  sass: 'css',
  scss: 'css',
  sh: 'shell',
  solidity: 'sol',
  sqlite: 'sql',
  styl: 'css',
  stylus: 'css',
  xhtml: 'html',
  yml: 'yaml',
  zsh: 'shell',
};

module.exports = language => {
  if (language in modeAliases) return modeAliases[language];
  return language;
};
