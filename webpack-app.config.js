const path = require('path');

const config = {
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
  externals: {
    http: 'http',
    https: 'https',
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
