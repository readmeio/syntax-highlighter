import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['test/__fixtures__/**'],
    },
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
