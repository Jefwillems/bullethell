module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'html',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['sketch'] }],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'new-cap': ['error', { newIsCapExceptions: ['p5'] }],
  },
  globals: {
    p5: true,
  },
};
