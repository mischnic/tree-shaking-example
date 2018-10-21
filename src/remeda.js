import {pipe, range, filter} from 'remeda';

function isOdd(x){
  return x % 2 === 0
}

function fn(x) {
  return pipe(
    x,
    x => range(2,x),
    x => filter(x, isOdd),
  )
}

console.log(fn(10))
