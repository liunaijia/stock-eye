module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: 'last 2 Chrome versions',
        },
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['react-hot-loader/babel'],
  ],
  env: {
    test: {
      plugins: [
        '@babel/transform-modules-commonjs',
      ],
    },
  },
};
