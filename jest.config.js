const path = require('path');

module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  prettierPath: require.resolve('prettier-2'),
  setupFilesAfterEnv: [path.join(__dirname, '__tests__/jest.setup.js')],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/', '<rootDir>/__tests__/jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Since `@readme/variable` doesn't ship any transpiled code, we need to transform it as we're
    // running tests.
    '<rootDir>/node_modules/@readme/variable/^.+\\.jsx?$',
  ],
};
