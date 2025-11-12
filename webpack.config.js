const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

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
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
};

module.exports = [serverConfig, clientConfig];
