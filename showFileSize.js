const filesize = require('filesize')
const {statSync} = require('fs')
const {remove, replace} = require('rambdax')
const cTable = require('console.table');

const showFileSize  = async () => {
  try{
    const filePaths = [
      `${__dirname}/dist/lodash.js`,
      `${__dirname}/dist/rambda.js`,
      `${__dirname}/dist/rambdax.js`,
      `${__dirname}/dist/ramda.js`,
      `${__dirname}/dist/ramdaBabel.js`,
      `${__dirname}/rollup/ramda.js`,
      `${__dirname}/rollup/ramdaBabel.js`,
      `${__dirname}/rollup/rambda.js`,
      `${__dirname}/rollup/lodash.js`,
      `${__dirname}/webpack/lodash.js`,
      `${__dirname}/webpack/ramda.js`,
      `${__dirname}/webpack/ramdaBabel.js`,
      `${__dirname}/webpack/rambda.js`,
      `${__dirname}/webpack/rambdax.js`,
    ]
    const sizes = filePaths.map(x => {
      const {size} = statSync(x)
      const fileRaw = remove([`${__dirname}/`,'.js'], x)
      return {
        file: replace('dist','parcel',fileRaw), 
        size: filesize(size)
      }
    })
    console.table(sizes)
  }catch(err){
    console.log(err)
  }
}

showFileSize()
