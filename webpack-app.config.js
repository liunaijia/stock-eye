const path = require('path');
const createConfig = require('./webpack-base.config');

module.exports = createConfig({
  target: 'node',
  entry: {
    fetchCurrentQuotes: './src/functions/fetchCurrentQuotes',
    fetchHistoryQuotes: './src/functions/fetchHistoryQuotes',
  },
  output: {
    path: path.resolve(__dirname, '.aws-sam/build'),
    // SAM requires that each function needs to be emitted to a folder
    filename: '[name]/index.js',
    // only commonjs2 works with SAM
    libraryTarget: 'commonjs2',
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
});
