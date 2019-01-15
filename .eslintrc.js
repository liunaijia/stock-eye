module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-jest', 'eslint-plugin-react-hooks'],
  globals: {
    chrome: true,
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'react/no-did-mount-set-state': 'off',
    'import/prefer-default-export': 'off',
    'no-debugger': 'warn',
    'max-len': ['error', {code: 200}],
    'react-hooks/rules-of-hooks': 'error',
  },
};
