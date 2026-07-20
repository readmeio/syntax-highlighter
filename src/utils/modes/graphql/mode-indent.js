// oxlint-disable no-this-in-exported-function

/**
 * Vendored from `codemirror-graphql`'s `esm/utils/mode-indent.js`, stripped of its TypeScript
 * types.
 *
 * @license MIT
 * @see {@link https://github.com/graphql/graphiql/blob/main/packages/codemirror-graphql/src/utils/mode-indent.ts}
 */

// Note: `electricInput` on a CodeMirror mode is written as `electricinput` in some type
// definitions, but CodeMirror itself looks it up as `electricInput`.
export default function indent(state, textAfter) {
  const levels = state.levels;
  // If there is no stack of levels, use the current level.
  // Otherwise, use the top level, pre-emptively dedenting for close braces.
  const level =
    !levels || levels.length === 0
      ? state.indentLevel
      : levels[levels.length - 1] - (this.electricInput?.test(textAfter) ? 1 : 0);
  return (level || 0) * (this.config?.indentUnit || 0);
}
