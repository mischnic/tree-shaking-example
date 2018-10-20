const filesize = require('filesize')
const {statSync} = require('fs')
const {remove, replace, sort} = require('rambdax')
const cTable = require('console.table');

const BYTES = ' B'
const KILOBYTES = ' KB'

function hasBytes(x){
  return 
}

function sortSizes(sizes){
  const sortFn = (aRaw,bRaw) => {
    const a = aRaw.size
    const b = bRaw.size
    if(a.includes(BYTES)&&b.includes(BYTES)){
      return Number(remove(BYTES, a)) > Number(remove(BYTES, b))
    }
    if(a.includes(BYTES)&&b.includes(KILOBYTES)) return -1
    if(a.includes(KILOBYTES)&&b.includes(BYTES)) return 1
    
      return Number(remove(KILOBYTES, a)) > Number(remove(KILOBYTES, b))
  }

  return sort(sortFn, sizes)

}

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
      `${__dirname}/rollup/rambdax.js`,
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
    console.table(sortSizes(sizes))
  }catch(err){
    console.log(err)
  }
}

showFileSize()
