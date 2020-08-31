'use strict';

const fs = require('fs');
const path = require('path');


module.exports = {
  wrapSource(src) {
    const preamble = fs.readFileSync(
      path.resolve(__dirname, 'preamble.js'),
      {encoding:'utf8', flag:'r'}
    );
    const receiver = fs.readFileSync(
      path.resolve(__dirname, 'receiver.js'),
      {encoding:'utf8', flag:'r'}
    );
    return preamble + '\n' + src + '\n' + receiver;
  }
}
