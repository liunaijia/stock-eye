const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    background: './src/background.js',
    popup: './src/App.jsx',
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    // headers 实现CROS
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\.js$).*\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  optimization: {
    // CommonsChunkPlugin is removed, see https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new WebpackMonitor({
    //   capture: true, // -> default 'true'
    //   target: '../monitor/stats.json', // default -> '../monitor/stats.json'
    //   launch: true, // -> default 'false'
    //   port: 8082, // default -> 8081
    // }),
  ],
};

// NODE_ENV=production npx webpack
if (process.env.NODE_ENV === 'production') {
  Object.assign(config, {
    devtool: 'source-map',
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new UglifyJSPlugin({ sourceMap: true }),
    ],
  });
}

module.exports = config;
