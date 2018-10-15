const filesize = require('filesize')
const {statSync} = require('fs')
const {log} = require('log')
const R = require('rambda')

const showFileSize  = async () => {
  try{
    const baseFilePath = `${process.cwd()}/dist`
    const getFilePath = R.compose(
      R.join('/'),
      R.takeLast(2),
      R.split('/')
    )

    const filePaths = [
      `${__dirname}/rollup/ramda.js`,
      `${__dirname}/rollup/rambda.js`,
      `${__dirname}/webpack/ramda.js`,
      `${__dirname}/webpack/rambda.js`,
      `${__dirname}/webpack/rambdax.js`,
    ]
    filePaths.map(x => {
      const filePath = getFilePath(x)
      const {size} = statSync(x)
      log(`${filePath} - ${filesize(size)}`, 'box')
    })
  }catch(err){
    console.log(err)
  }
}

showFileSize()
