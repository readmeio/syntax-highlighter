const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const base = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: './.babelrc',
          },
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  externals: {
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
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const serverConfig = {
  ...base,
  target: 'node',
  entry: ['./src/index.node.js'],
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
