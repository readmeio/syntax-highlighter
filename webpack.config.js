// oxlint-disable typescript/no-require-imports
const path = require('path');

const base = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(j|t)s(x?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: './.babelrc',
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom',
      },
      '@readme/variable': '@readme/variable',
      codemirror: 'codemirror',
      'react-codemirror2': 'react-codemirror2',
      'prop-types': 'prop-types',
    },
    // `codemirror`, `react-codemirror2`, and `prop-types` are runtime `dependencies` that every
    // consumer already installs, so bundling them too is double-shipping. This externalizes deep
    // requires as well (mode/addon files, `codemirror/lib/codemirror`), so the consumer's own
    // bundler resolves them from its own `node_modules`. CSS imports (e.g.
    // `codemirror/addon/scroll/simplescrollbars.css`) stay bundled via style-loader so consumers
    // don't need their own CSS handling for our node_modules imports.
    ({ request }, callback) => {
      if (request.startsWith('codemirror/') && !request.endsWith('.css')) {
        return callback(null, `commonjs2 ${request}`);
      }
      callback();
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

const serverConfig = {
  ...base,
  target: 'node',
  entry: ['./src/index.node.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.node.js',
    libraryTarget: 'commonjs2',
  },
};

const clientConfig = {
  ...base,
  target: 'web',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
};

module.exports = [serverConfig, clientConfig];
