![Build Status](https://travis-ci.org/astagi/workerloader-jest-transformer.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/astagi/workerloader-jest-transformer/badge.svg?branch=master)](https://coveralls.io/github/astagi/workerloader-jest-transformer?branch=master)

## workerloader-jest-transformer

⚠️ This transformer is highly experimental. Any contribution and advice would be greatly appreciated!

### A Jest transformer for Webpack worker-loader

This transformer helps you to use [Jest](https://facebook.github.io/jest/) testing with [Webpack worker-loader module](https://github.com/webpack-contrib/worker-loader). Inspired by [jsdom-worker](https://github.com/developit/jsdom-worker)

### Install

```sh
npm install workerloader-jest-transformer --save-dev
```

### Setting up Jest config file

`workerloader-jest-transformer` must be used in your Jest config file like this:

```js
{
    "transform": {
        "^.+\\.worker.js$": "workerloader-jest-transformer"
    }
}
```
