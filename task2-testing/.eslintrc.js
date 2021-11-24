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
  rules: {
    'no-shadow': 'off',
    'import/no-extraneous-dependencies': 'off',
    'node/no-extraneous-require': 'off',
    'no-underscore-dangle': 'off',
  },
};
