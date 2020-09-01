'use strict';

const fs = require('fs');
const path = require('path');
const {transformSync} = require('@babel/core');

module.exports = {
  wrapSource(src, filename) {
    const worker = fs.readFileSync(
      path.resolve(__dirname, 'worker.js'),
      {encoding:'utf8', flag:'r'}
    );
    const {code, map} = transformSync(src, {
      filename,
      sourceMaps: true
    })
    return {
      code: worker.replace('/* {% WORKER_CODE %} */', code),
      map
    }
  }
}
