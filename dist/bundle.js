function range(start, end) {
  const willReturn = [];
  for (let i = start; i < end; i++) {
    willReturn.push(i);
  }

  return willReturn;
}

// import add from 'rambda/modules/add.js'
// import {range} from 'rambda/dist/rambda.esm.js'
// import {add} from 'lodash/add'

function fn(x) {
  return range(2, x);
}

console.log(fn(10));
