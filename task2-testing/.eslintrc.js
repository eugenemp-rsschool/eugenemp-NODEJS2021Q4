module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
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
  plugins: ['prettier'],
  rules: { 'no-shadow': 'off' },
};
