const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ENABLE_BUNDLE_ANALYZER = process.env.ANALYZE;

const config = {
  target: 'node',
  devtool: 'none',
  entry: {
    fetchCurrentQuotes: './src/functions/fetchCurrentQuotes',
    fetchHistoryQuotes: './src/functions/fetchHistoryQuotes',
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
  plugins: [
    // Webpack bundle analyzer represents webpack bundle content that helps optimization
    new BundleAnalyzerPlugin({
      analyzerMode: ENABLE_BUNDLE_ANALYZER ? 'server' : 'disabled',
    }),
  ],
};

module.exports = config;
