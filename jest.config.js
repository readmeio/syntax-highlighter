const path = require('path');

module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFiles: [path.join(__dirname, '/lib/enzyme')],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Since `@readme/variable` doesn't ship any transpiled code, we need to transform it as we're
    // running tests.
    '<rootDir>/node_modules/@readme/variable/^.+\\.jsx?$',
  ],
};
