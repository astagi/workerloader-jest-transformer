'use strict';

const wrapper = require('./utils/wrapper');

module.exports = {
  process(src, filename, config, options) {
    let lang
    let transformer
    if (/^.+\.[t]sx?$/.test(filename)) {
      lang = 'ts'
      transformer = require('ts-jest').default
    } else {
      lang = 'js'
      transformer = require('babel-jest').default
    }
    const wrappedSrc = wrapper.wrapSource(src, lang)
    return transformer.createTransformer().process(wrappedSrc, filename, config, { ...options, instrument: false });
  },
};
