'use strict';

module.exports = [
  [
    'npm-install',
    {
      name: 'preact-cli',
      version: 'rc',
      isDev: true
    }
  ],
  [
    'npm-install',
    {
      name: 'preact'
    }
  ],
  [
    'npm-install',
    {
      name: 'preact-render-to-string'
    }
  ],
  [
    'tsconfig',
    {
      compilerOptions: {
        target: 'ES5',
        module: 'ESNext',
        allowJs: true,
        jsx: 'react',
        jsxFactory: 'h',
        strict: true,
        moduleResolution: 'node',
        allowSyntheticDefaultImports: true,
        esModuleInterop: true
      },
      include: ['src/**/*.tsx', 'src/**/*.ts']
    }
  ],
  [
    'eslint-prettier',
    {
      env: 'ts'
    }
  ],
  'build',
  ['npm-scripts', 'build:preact', 'preact build'],
  ['npm-scripts', 'watch', 'preact watch'],
  [
    'npm-install',
    {
      name: 'eslint-config-preact',
      isDev: true
    }
  ],
  ['eslint-extend', 'preact', 'prepend'],
  [
    'npm-install',
    {
      name: '@testing-library/preact',
      isDev: true
    }
  ],
  [
    'npm-install',
    {
      name: '@testing-library/jest-dom',
      isDev: true
    }
  ]
];
