module.exports = {
  setupFiles: ['<rootDir>/testShim.js', '<rootDir>/testSetup.js'],
  // white list lodash-es
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es/.*)'],
};
