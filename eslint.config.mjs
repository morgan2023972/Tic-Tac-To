import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  // Règles recommandées d'ESLint
  js.configs.recommended,

  // Désactive les règles ESLint en conflit avec Prettier
  prettier,

  {
    files: ['**/*.js'],

    plugins: {
      prettier: pluginPrettier,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script', // Projet en CommonJS
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',

      // Active Prettier comme règle ESLint
      'prettier/prettier': 'error',
    },
  },
];
