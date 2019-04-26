const { RESOLVE_EXTENSIONS } = require('./const');

module.exports = {
  // the parser uses TypeScript Compiler to generate AST that ESLint can handle.
  // it deals with all the ESLint specific configuration, and then calls @typescript-eslint/typescript-estree which
  // invokes TypeScript Compiler on the given source code in order to produce a TypeScript AST, and then converting that
  // AST into a format that ESLint expects.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // all available options: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
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
    '@typescript-eslint',
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
