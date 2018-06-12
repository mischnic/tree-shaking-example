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
      `${process.cwd()}/rambdax/tree-shaking-example.js`,
      `${process.cwd()}/rambda/tree-shaking-example.js`,
      `${process.cwd()}/ramda/tree-shaking-example.js`,
      `${baseFilePath}/webpack.rambdax.js`,
      `${baseFilePath}/webpack.rambda.js`,
      `${baseFilePath}/webpack.ramda.js`,
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
