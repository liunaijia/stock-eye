const path = require('path');

const config = {
  target: 'node',
  devtool: 'none',
  entry: {
    fetchCurrentQuotes: './src/functions/fetchCurrentQuotes',
  },
  output: {
    path: path.resolve(__dirname, '.aws-sam/build'),
    // SAM requires that each function needs to be emitted to a folder
    filename: '[name]/index.js',
    // library name should be the same with function handler in SAM template
    library: 'index',
    // only commonjs2 works with SAM
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.ts'],
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
