'use strict';


const babelJest = require('babel-jest');
const wrapper = require('./utils/wrapper');


module.exports = {
  process(src, filename, config, options) {
    const wrappedSrc = wrapper.wrapSource(src, filename)
    return babelJest.process(wrappedSrc, filename, config, { ...options, instrument: false });
  },
};
