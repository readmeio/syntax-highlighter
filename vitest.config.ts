// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['__tests__/__fixtures__/**'],
    },
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
