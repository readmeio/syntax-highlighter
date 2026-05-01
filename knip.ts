import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/utils/index.ts', 'public/index.js', 'public/index.legacy.js'],
  ignore: ['test/__fixtures__/**'],
  ignoreDependencies: [
    '@csstools/css-parser-algorithms', // required in order to get vitest/jsdom running in CI
    'eslint-plugin-readme', // pulled in and used by oxlint
  ],
  oxfmt: {
    config: ['oxfmt.config.ts'],
  },
  oxlint: {
    config: ['oxlint.config.ts'],
  },
  vitest: {
    config: ['vitest.config.ts'],
    entry: ['test/**/*.ts(x)?'],
  },
};

export default config;
