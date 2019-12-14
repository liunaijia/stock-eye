/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { RESOLVE_EXTENSIONS } = require('./const');

const ENABLE_BUNDLE_ANALYZER = process.env.ANALYZE;

const merge = (...args) => args.reduce(
  (memo, arg) => Object.entries(arg).reduce((_, [key, value]) => {
    const existingValue = memo[key];

    let newValue;
    if (Array.isArray(existingValue)) {
      newValue = existingValue.concat(value);
    } else if (existingValue && Object.keys(existingValue).length) {
      newValue = merge(existingValue, value);
    } else {
      newValue = value;
    }

    return Object.assign(memo, {
      [key]: newValue,
    });
  }, {}),
  {},
);

const baseConfig = (env, argv) => ({
  devtool: argv.mode === 'production' ? 'none' : 'source-map',
  resolve: {
    extensions: RESOLVE_EXTENSIONS,
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\..*?$).*\.(js|ts)x?$/,
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
  plugins: [
    // Webpack bundle analyzer represents webpack bundle content that helps optimization
    new BundleAnalyzerPlugin({
      analyzerMode: ENABLE_BUNDLE_ANALYZER ? 'server' : 'disabled',
    }),
  ],
});

const createConfig = (additionalConfig) => (env, argv) => {
  const baseConfigObj = baseConfig(env, argv);
  const additionalConfigObj = typeof additionalConfig === 'function' ? additionalConfig(env, argv) : additionalConfig;
  return merge(baseConfigObj, additionalConfigObj);
};

module.exports = createConfig;
