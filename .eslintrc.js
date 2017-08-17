module.exports = {
  extends: ['airbnb'],
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
