# Sayonara, config

> A zero-config toolkit for JavaScript projects.

Currently this toolkit includes:

- Project initialization (`npm init`, `git init`, `.editorconfig`, etc.)
- Linting via ESLint+Prettier
- Auto formatting via Prettier
- Jest as a test runner
- TypeScript support for Node.js apps (for now)

## Installation

Install it globally:

```
npm install -g @alex7kom/sayonara-config
```

## Usage

**Sayonara, config** has multiple sets of configuration suitable for different types of project.

- `node-app` - Node.js app
- `node-app-ts` - TypeScript Node.js app
- `node-library` - Node.js library
- `universal-library` - a library meant to be used on both the client and the server
- `npm-package` - prepare project for publish on NPM

Multiple sets are allowed.

Just run in the project directory:

```
sayonara-config node-library npm-package
```

It will install all the needed dependencies and project boilerplate.
It will also remember installed sets so the next time you upgrade **Sayonara, config** you'll just need to run:

```
sayonara-config
```

## Usage

Commands exposed via NPM scripts:

- `lint` - lint \*.js and \*.ts files in `/src` directory
- `pretty` - pretty \*.js and \*.ts files in `/src`
- `test` - run Jest on \*.test.js and \*.test.ts files in `/src`

## License

The MIT License (MIT)

Copyright (c) 2018-present Alexey Komarov <alex7kom@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
