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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
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
        AUTH_API: getEnvVar('AUTH_API'),
        GET_USERS_API: getEnvVar('GET_USERS_API'),
        ADMIN_API: getEnvVar('ADMIN_API'),
        TRAINER_API: getEnvVar('TRAINER_API'),
        CLIENT_API: getEnvVar('CLIENT_API'),
        EXERCISES_API: getEnvVar('EXERCISES_API'),
        FAV_EXERCISES_API: getEnvVar('FAV_EXERCISES_API'),
        ADD_TO_FAV_API: getEnvVar('ADD_TO_FAV_API'),
        REMOVE_FROM_FAV_API: getEnvVar('REMOVE_FROM_FAV_API'),
        UPLOAD_API: getEnvVar('UPLOAD_API'),
        RAPID_API_HOST: getEnvVar('RAPID_API_HOST'),
        RAPID_API_KEY: getEnvVar('RAPID_API_KEY'),
      }),
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

if (!isProd) config.plugins.unshift(new ReactRefreshPlugin());

module.exports = config;
