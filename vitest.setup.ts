/* eslint-disable import/no-extraneous-dependencies */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  // https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
  cleanup();
});
