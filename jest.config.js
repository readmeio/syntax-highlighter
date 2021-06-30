const path = require('path');

module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  setupFiles: [path.join(__dirname, '/lib/enzyme')],
  testPathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
  transform: {
    '^.+\\.jsx?$': path.join(__dirname, '/lib/babel-jest'),
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
