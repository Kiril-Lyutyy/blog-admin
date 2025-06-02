import babelParser from '@babel/eslint-parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    files: ['frontend/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      curly: ['error', 'all'],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    files: ['backend/**/*.{js,ts}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        requireConfigFile: false,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      curly: ['error', 'all'],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
];
