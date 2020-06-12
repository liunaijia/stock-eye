const { RESOLVE_EXTENSIONS } = require('./const');

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  // babel-eslint makes eslint to support typescript
  parser: 'babel-eslint',
  plugins: [
    'eslint-plugin-jest',
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
