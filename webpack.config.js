const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { RESOLVE_EXTENSIONS } = require('./const');

const config = {
  devtool: 'source-map',
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
  resolve: {
    extensions: RESOLVE_EXTENSIONS,
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\.jsx?$).*\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    // CommonsChunkPlugin is removed, see https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // new DashboardPlugin({
    //   minified: false,
    //   gzip: false,
    // }),
    new HtmlWebpackPlugin({
      template: './src/website/index.html',
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: m => m.context && m.context.includes('node_modules'),
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime',
    // }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new WebpackMonitor({
    //   capture: true, // -> default 'true'
    //   target: '../monitor/stats.json', // default -> '../monitor/stats.json'
    //   launch: true, // -> default 'false'
    //   port: 8082, // default -> 8081
    // }),

    // enable hot module replacement
    new webpack.HotModuleReplacementPlugin(),

    // new BundleAnalyzerPlugin(),
  ],
};

module.exports = config;
