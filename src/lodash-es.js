import {flowRight, range, filter} from "lodash-es";

function isOdd(x) {
	return x % 2 === 0;
}

function fn(input) {
	return flowRight([x => filter(x, isOdd), x => range(2, x)])(input);
}

console.log(fn(10));
