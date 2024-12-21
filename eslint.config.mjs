import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      'no-useless-escape': '0',
      "no-unused-vars": "error",
      "no-dupe-else-if": "error",
      'no-const-assign': 'error',
    },
  },
  pluginJs.configs.recommended,
];
