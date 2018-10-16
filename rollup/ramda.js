'use strict';

var range = require('ramda/src/range');

var compose = require('ramda/src/compose');

var filter = require('ramda/src/filter');

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return compose(filter(isOdd), range(2))(x);
}

console.log(fn(10));
