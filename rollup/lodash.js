'use strict';

var _ = require('lodash');

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return _.flowRight([_.filter(isOdd), _.range(2)])(x);
}

console.log(fn(10));
