const path = require('path');

module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!lib/*.js',
    '!**/node_modules/**',
    '!jest.config.js',
    '!**/coverage/lcov-report/**',
  ],
  setupFiles: [path.join(__dirname, '/lib/enzyme')],
  testPathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  transform: {
    '^.+\\.jsx?$': path.join(__dirname, '/lib/babel-jest'),
  },
  transformIgnorePatterns: [
    // Since `@readme/variable` doesn't ship any transpiled code, we need to transform it as we're running tests.
    '<rootDir>/node_modules/@readme/variable/^.+\\.jsx?$',
  ],
};
