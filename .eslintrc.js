const { RESOLVE_EXTENSIONS } = require('./const');

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',

    // This plugin exports a recommended configuration that enforces Flow type good practices.
    'plugin:flowtype/recommended'
  ],
  // babel-eslint makes eslint to support flow and typescript
  parser: 'babel-eslint',
  plugins: [
    'eslint-plugin-jest',
    'eslint-plugin-flowtype'
  ],
  globals: {
    chrome: true,
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    'react/no-did-mount-set-state': 'off',
    'import/prefer-default-export': 'off',
    'no-debugger': 'warn',
    'max-len': ['error', {code: 200}],
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        // allow to find TypeScript files when there is no extension for an import statement
        extensions: RESOLVE_EXTENSIONS
      }
    }
  },
};
