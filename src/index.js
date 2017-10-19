// import add from 'rambda/modules/add.js'
// import {range} from 'rambda/dist/rambda.esm.js'
import {range} from 'rambda'
// import {add} from 'lodash/add'

function fn(x) {
  return range(2,x)
}

console.log(fn(10))
