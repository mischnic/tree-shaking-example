'use strict';

var _ = require('lodash');

function isOdd(x) {
  return x % 2 === 0;
}

function fn(input) {
  return _.flowRight([function (x) {
    return _.filter(x, isOdd);
  }, rangeFn = function rangeFn(x) {
    return _.range(2, x);
  }])(input);
}

console.log(fn(10));
