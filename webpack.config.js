const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config();

const getEnvVar = (key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable ${key}`);

    throw new Error(`Missing environment variable ${key}`);
  }
  return process.env[key];
};

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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        LOGIN_API: getEnvVar('LOGIN_API'),
        REGISTER_API: getEnvVar('REGISTER_API'),
        FORGOT_PWD_API: getEnvVar('FORGOT_PWD_API'),
        RESET_PWD_API: getEnvVar('RESET_PWD_API'),
      }),
    }),
  ],
};
