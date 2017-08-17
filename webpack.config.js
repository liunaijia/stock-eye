// const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
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
};
