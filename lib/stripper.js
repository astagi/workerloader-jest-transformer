'use strict';

const importsRe = new RegExp(/import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/, 'mg')

module.exports = {
  stripImports(src) {

    const imports = []

    src.match(importsRe).map((match) => {
      imports.push(match)
    })

    return {
      code: src.replace(importsRe, ''),
      imports
    }
  }
}
