import oxfmtConfig from '@readme/oxlint-config/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig(
  Object.assign(structuredClone(oxfmtConfig), {
    sortImports: {
      ...oxfmtConfig.sortImports,
    },
    ignorePatterns: ['coverage/', 'dist/', 'test/__fixtures__/', 'test/__snapshots__/', '*.html', '*.scss'],
  }),
);
