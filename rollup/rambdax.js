'use strict';

var rambdax = require('rambdax');

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return rambdax.compose(rambdax.filter(isOdd), rambdax.range(2))(x);
}

console.log(fn(10));
