import {range} from 'ramda'

function fn(x) {
  return range(2,x)
}

console.log(fn(10))
