/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createConfig = require('./webpack-base.config');

module.exports = createConfig({
  devServer: {
    contentBase: './docs',
    hot: true,
    // use proxy to avoid cros request
    // https://github.com/chimurai/http-proxy-middleware
    proxy: {
      '/current_quotes': {
        target: 'https://hq.sinajs.cn',
        pathRewrite: { '^/current_quotes': '' },
        changeOrigin: true,
      },
      '/history_quote': {
        target: 'http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php',
        pathRewrite: { '^/history_quote': '' },
        changeOrigin: true,
      },
      '/newone': {
        target: 'https://etrade.newone.com.cn',
        secure: false, // ignore invalid SSL certificate
        pathRewrite: { '^/newone': '' },
        changeOrigin: true,
      },
    },
  },
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
});
