import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/utils/index.ts', 'public/index.js', 'public/index.legacy.js'],
  ignore: ['__tests__/__fixtures__/**'],
  ignoreDependencies: [
    '@csstools/css-parser-algorithms', // required in order to get vitest/jsdom running in CI
    'jsdom', // this is installed via vitest
  ],
};

export default config;
