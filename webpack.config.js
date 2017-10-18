const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.jsx',
    vendor: [
      'iconv-lite',
      'prop-types',
      'react',
      'react-dom',
      'styled-components',
    ],
  },
  devtool: 'eval-source-map',
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
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new BundleAnalyzerPlugin(),
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
      new UglifyJSPlugin({sourceMap: true}),
    ],
  });
}

module.exports = config;
