const filesize = require('filesize')
const {statSync} = require('fs')
const {remove} = require('rambdax')
const cTable = require('console.table');

const showFileSize  = async () => {
  try{
    const filePaths = [
      `${__dirname}/rollup/ramda.js`,
      `${__dirname}/rollup/rambda.js`,
      `${__dirname}/rollup/lodash.js`,
      `${__dirname}/webpack/lodash.js`,
      `${__dirname}/webpack/ramda.js`,
      `${__dirname}/webpack/rambda.js`,
      `${__dirname}/webpack/rambdax.js`,
    ]
    const sizes = filePaths.map(x => {
      const {size} = statSync(x)
      
      return {
        file: remove([`${__dirname}/`,'.js'], x), 
        size: filesize(size)
      }
    })
    console.table(sizes)
  }catch(err){
    console.log(err)
  }
}

showFileSize()
