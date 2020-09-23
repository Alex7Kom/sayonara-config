'use strict';

module.exports = {
  plugins: ['jest', 'jest-formatting'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
  ],
  rules: {
    'node/no-unpublished-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
  },
};
