module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'import'],
  env: {
    node: true,
    es2020: true,
  },
  rules: {
    'no-console': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
  },
};
