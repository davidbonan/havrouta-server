module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    "plugin:prettier/recommended"
  ],
  globals: {
    jest: true,
    describe: true,
    it: true,
    expect: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-use-before-define": "off"
  },
};
