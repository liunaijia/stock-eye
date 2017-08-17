module.exports = {
  extends: ['airbnb-base'],
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
