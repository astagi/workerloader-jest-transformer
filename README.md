# workerloader-jest-transformer

[![npm-version](https://img.shields.io/npm/v/workerloader-jest-transformer.svg)](https://www.npmjs.com/package/workerloader-jest-transformer) [![Build Status](https://travis-ci.org/astagi/workerloader-jest-transformer.svg?branch=master)](https://travis-ci.org/astagi/workerloader-jest-transformer) [![codecov](https://codecov.io/gh/astagi/workerloader-jest-transformer/branch/master/graph/badge.svg)](https://codecov.io/gh/astagi/workerloader-jest-transformer) [![license](https://img.shields.io/npm/l/express.svg)]()

## A Jest transformer for Webpack worker-loader

⚠️ This transformer is highly experimental. Any contribution and advice would be greatly appreciated!

This transformer helps you to use [Jest](https://facebook.github.io/jest/) testing with [Webpack worker-loader module](https://github.com/webpack-contrib/worker-loader). Inspired by [jsdom-worker](https://github.com/developit/jsdom-worker)

### Install

```sh
npm install workerloader-jest-transformer --save-dev
```

or

```sh
yarn add workerloader-jest-transformer --dev
```

### Setting up Jest config file

`workerloader-jest-transformer` must be used in your Jest config file like this:

```js
{
  "transform": {
    "^.+\\.worker.[t|j]sx?$": "workerloader-jest-transformer"
  }
}
```
