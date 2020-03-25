module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'google'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['vue'],
  rules: {
    'object-curly-spacing': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'new-cap': 'off',
    'arrow-parens': 'off',
    indent: ['error', 2]
  }
};