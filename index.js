'use strict';

const {transformSync} = require('@babel/core');
const wrapper = require('./utils/wrapper');

module.exports = {
  process(src, filename, config, options) {
    const wrappedSrc = wrapper.wrapSource(src, filename)
    const { code, map } = transformSync(wrappedSrc, {
      filename,
      sourceMaps: true
    });
    return {
      code,
      map
    };
  },
};
