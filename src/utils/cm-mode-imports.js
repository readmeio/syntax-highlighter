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
