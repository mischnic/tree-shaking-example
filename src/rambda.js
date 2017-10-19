import {range} from 'rambda'
// import {range} from 'rambda/dist/rambda.esm.js'

function fn(x) {
  return range(2,x)
}

console.log(fn(10))
