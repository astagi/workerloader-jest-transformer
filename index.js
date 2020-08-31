'use strict';

const {transform} = require('@babel/core');
const wrapper = require('./lib/wrapper');


module.exports = {
  process(src, filename, config, options) {
    const result = transform(wrapper.wrapSource(src), {
      filename
    });
    return result ? result.code : src;
  },
};
