import { range, compose, filter } from "rambdax";

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
