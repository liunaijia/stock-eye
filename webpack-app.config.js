const path = require('path');

const config = {
  target: 'node',
  devtool: 'none',
  entry: {
    fetchCurrentQuotes: './src/functions/fetchCurrentQuotes',
  },
  output: {
    path: path.resolve(__dirname, '.aws-sam/build'),
    filename: '[name]/index.js',
    library: 'index',
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
