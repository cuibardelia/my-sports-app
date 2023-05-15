/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

const getEnvVar = (key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable ${key}`);

    throw new Error(`Missing environment variable ${key}`);
  }
  return process.env[key];
};

const config = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
          },
        },
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
      },
    ),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        LOGIN_API: getEnvVar('LOGIN_API'),
        REGISTER_API: getEnvVar('REGISTER_API'),
        FORGOT_PWD_API: getEnvVar('FORGOT_PWD_API'),
        RESET_PWD_API: getEnvVar('RESET_PWD_API'),
        GET_TRAINERS_API: getEnvVar('GET_TRAINERS_API'),
        GET_CLIENTS_API: getEnvVar('GET_CLIENTS_API'),
      }),
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

if (!isProd) config.plugins.unshift(new ReactRefreshPlugin());

module.exports = config;
