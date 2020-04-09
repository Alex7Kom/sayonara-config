'use strict';

module.exports = [
  [
    'tsconfig',
    {
      compilerOptions: {
        allowJs: true,
        checkJs: true,
        noEmit: true,
      },
      exclude: ['node_modules', '**/node_modules/*'],
    },
  ],
  'build-dts-script',
];
