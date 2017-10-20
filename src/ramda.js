import {range, compose, filter} from 'ramda'

function isOdd(x){
  return x % 2 === 0
}

function fn(x) {
  return compose(
    filter(isOdd),
    range(2)
  )(x)
}

console.log(fn(10))
