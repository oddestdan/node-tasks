module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'google'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 'off',
    'object-curly-spacing': 'off',
    'require-jsdoc': 'off',
    'comma-dangle': 'off',
    indent: 'off',
    'linebreak-style': 0,
    'max-len': ['error', { code: 120 }],
  },
};
