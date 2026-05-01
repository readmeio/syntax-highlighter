import oxlintConfig from '@readme/oxlint-config';
import oxlintConfigVitest from '@readme/oxlint-config/testing/vitest';
import oxlintConfigTS from '@readme/oxlint-config/typescript';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [oxlintConfig, oxlintConfigTS],
  options: {
    reportUnusedDisableDirectives: 'error',
  },
  ignorePatterns: ['coverage/', 'dist/', 'dist-utils/', 'public/index.*', 'test/__fixtures__/**/sample.*'],
  categories: {
    suspicious: 'error',
  },
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
  },
  plugins: ['react'],
  rules: {
    'no-unassigned-import': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.test.{js,ts}'],
      ...oxlintConfigVitest,
      rules: oxlintConfigVitest.rules,
    },
  ],
});
