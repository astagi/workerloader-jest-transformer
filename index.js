'use strict';

const {transformSync} = require('@babel/core');
const wrapper = require('./lib/wrapper');


module.exports = {
  process(src, filename, config, options) {
    const wrappedSrc = wrapper.wrapSource(src, filename)
    const { code, map } = transformSync(wrappedSrc.code, {
      filename,
      sourceMaps: true
    });
    console.log(code)
    return {
      code,
      map: map
    };
  },
};
