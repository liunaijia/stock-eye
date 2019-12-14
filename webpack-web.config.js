/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createConfig = require('./webpack-base.config');

module.exports = createConfig((env, argv) => {
  const config = {
    entry: './src/website',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: '[name].js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        template: './src/website/index.html',
      }),
      // enable hot module replacement
      new webpack.HotModuleReplacementPlugin(),
    ],
  };

  if (argv.mode === 'development') {
    Object.assign(config, {
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    });
  }

  return config;
});
