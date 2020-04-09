'use strict';

module.exports = [
  [
    'tsconfig',
    {
      compilerOptions: {
        noEmit: true,
        resolveJsonModule: true,
        moduleResolution: 'node',
        lib: ['es2017'],
        target: 'esnext',
      },
      exclude: ['node_modules', '**/node_modules/*'],
    },
  ],
  [
    'eslint-prettier',
    {
      env: 'node-ts',
    },
  ],
];
