import _ from "lodash";

function isOdd(x) {
	return x % 2 === 0;
}

function fn(input) {
	return _.flowRight([x => _.filter(x, isOdd), x => _.range(2, x)])(input);
}

console.log(fn(10));
