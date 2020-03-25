module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 2018
  },
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
