const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/index.js'],
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
