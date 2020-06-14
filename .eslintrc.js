const { RESOLVE_EXTENSIONS } = require('./const');

module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',

    // Enable all the recommended rules for the plugin
    'plugin:@typescript-eslint/recommended',
    // Require type-checking
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  // allow ESLint to understand TypeScript syntax.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'eslint-plugin-jest',
    // allow to use rules of TypeScript
    '@typescript-eslint'
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
