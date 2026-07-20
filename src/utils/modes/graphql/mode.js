/**
 * Vendored from `codemirror-graphql`'s `esm/mode.js`. Vendoring this mode (rather than depending
 * on the `codemirror-graphql` package) lets us pull in only the ~600 lines this mode actually
 * needs from `graphql-language-service`'s parser, instead of the full `graphql-language-service`
 * package and its `graphql` peer dependency (whose validation rules alone account for several
 * hundred KB of the published bundle).
 *
 * @license MIT
 * @see {@link https://github.com/graphql/graphiql/blob/main/packages/codemirror-graphql/src/mode.ts}
 */
import CodeMirror from 'codemirror';

import modeFactory from './mode-factory.js';

CodeMirror.defineMode('graphql', modeFactory);
