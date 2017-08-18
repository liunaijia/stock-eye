module.exports = {
  extends: ['airbnb'],
  parser: "babel-eslint",
  plugins: [
    'eslint-plugin-jest'
  ],
  globals: {
    chrome: true
  },
  env: {
    browser: true,
    'jest/globals': true    
  }
};
