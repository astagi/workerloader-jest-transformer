'use strict';


const wrapper = require('./utils/wrapper');


module.exports = {
  process(src, filename, config, options) {
    let lang = 'js'
    if (/^.+\.[t]sx?$/.test(filename)) {
      lang = 'ts'
      console.log('TYPE')
    }
    const wrappedSrc = wrapper.wrapSource(src, lang)
    if (lang == 'js') {
      return require('babel-jest').process(wrappedSrc, filename, config, { ...options, instrument: false });
    } else {
      return require('ts-jest').process(wrappedSrc, filename, config, { ...options, instrument: false });
    }
  },
};
