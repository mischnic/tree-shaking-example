const filesize = require('filesize')
const {statSync} = require('fs')
const {remove, replace, sort, s, flatMap, flatten} = require('rambdax')
const cTable = require('console.table');
s()

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

const supportedLibraries = [
  'lodash',
  'remeda',
  'ramda',
  'ramdaBabel',
  'rambda',
  'rambdax',
]

const showFileSize  = async () => {
  try{

    const filePaths = supportedLibraries
      .s(
        flatMap(xx=> {
          return [
            `${__dirname}/dist/${xx}.js`,
            `${__dirname}/rollup/${xx}.js`,
            `${__dirname}/webpack/${xx}.js`,
          ]
        })
      )
      .s(flatten)
    
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
