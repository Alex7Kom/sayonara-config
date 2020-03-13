# Sayonara, config

> A zero-config toolkit for JavaScript and TypeScript projects.

Currently this toolkit includes:

- Project initialization (`npm init`, `git init`, `.editorconfig`, etc.)
- Linting via ESLint+Prettier
- Auto formatting via Prettier
- Jest as a test runner
- TypeScript support
- JSDoc support

## Usage

**Sayonara, config** has multiple sets of configuration suitable for different types of project.

- `node-app` - Node.js app
- `node-app-ts` - TypeScript Node.js app
- `node-library` - Node.js library
- `browser-library` - a library meant to be used on the client
- `universal-library` - a library meant to be used on both the client and the server
- `npm-package` - prepare project for publish on NPM
- `ts-ready` - a typechecked JS library with index.d.ts built
- `preact-app-ts` - a TypeScript Preact App

Multiple sets are allowed.

Just run in the project directory:

```
npx @alex7kom/sayonara-config node-library npm-package
```

It will install all the needed dependencies and project boilerplate.
It will also remember installed sets so the next time you upgrade **Sayonara, config** you'll just need to run:

```
sayonara-config
```

## Usage

Commands exposed via NPM scripts:

- `lint` - lint `*.js` and `*.ts` files in `/src` directory
- `pretty` - pretty `*.js` and `*.ts` files in `/src`
- `test` - run Jest on `*.test.js(x)` and `*.test.ts(x)` files in `/src`
- `build` - run build tools where applicable

## License

MIT
