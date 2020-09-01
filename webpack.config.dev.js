const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./public/index.js'],
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
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3400,
    hot: true,
    watchContentBase: true,
  },
};
