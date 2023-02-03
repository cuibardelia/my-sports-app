const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
          options: {
            configFile: path.resolve('babel.config.json'),
            plugins: [require.resolve('react-refresh/babel')],
          },
        }
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new ESLintPlugin({}),
    new CopyWebpackPlugin(
        {
          patterns: [
            { from: 'src/assets', to: 'assets' },
          ],
        }
    ),
  ],
};
