'use strict';

module.exports = [
  'ts',
  [
    'tsconfig',
    {
      compilerOptions: {
        noEmit: true,
        resolveJsonModule: true,
        moduleResolution: 'node',
        strict: true,
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
