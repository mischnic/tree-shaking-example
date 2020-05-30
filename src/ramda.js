// const range = require('ramda/src/range')
// const compose = require('ramda/src/compose')
// const filter = require('ramda/src/filter')
import { range, compose, filter } from "ramda";

function isOdd(x) {
	return x % 2 === 0;
}

function fn(x) {
	return compose(
		filter(isOdd),
		range(2)
	)(x);
}

export const answer = fn(10).join(',');
