// oxlint-disable no-param-reassign

/**
 * Vendored from `graphql-language-service`'s `esm/parser/RuleHelpers.js`, stripped of its
 * TypeScript types.
 *
 * @license MIT
 * @see {@link https://github.com/graphql/graphiql/blob/main/packages/graphql-language-service/src/parser/RuleHelpers.ts}
 */

// These functions help build matching rules for ParseRules.

// An optional rule.
export function opt(ofRule) {
  return { ofRule };
}

// A list of another rule.
export function list(ofRule, separator) {
  return { ofRule, isList: true, separator };
}

// A constraint described as `but not` in the GraphQL spec.
export function butNot(rule, exclusions) {
  const ruleMatch = rule.match;
  rule.match = token => {
    let check = false;
    if (ruleMatch) {
      check = ruleMatch(token);
    }
    return check && exclusions.every(exclusion => exclusion.match && !exclusion.match(token));
  };
  return rule;
}

// Token of a kind
export function t(kind, style) {
  return { style, match: token => token.kind === kind };
}

// Punctuator
export function p(value, style) {
  return {
    style: style || 'punctuation',
    match: token => token.kind === 'Punctuation' && token.value === value,
  };
}
