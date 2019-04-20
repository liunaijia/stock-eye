const { RESOLVE_EXTENSIONS } = require('./const');

module.exports = {
  // Parse typescript files with tsconfig
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb',
    // Use the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'eslint-plugin-jest',
    'eslint-plugin-react-hooks',
    // allows for TypeScript-specific linting rules to run
    '@typescript-eslint'
  ],
  globals: {
    chrome: true,
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
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
