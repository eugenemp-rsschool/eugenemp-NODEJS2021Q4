module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: ['prettier', 'jest'],
  rules: { 'no-shadow': 'off' },
  ignorePatterns: ['**/*.test.js'],
};
