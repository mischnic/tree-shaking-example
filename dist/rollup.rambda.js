function filterObject(fn, obj) {
  const willReturn = {};

  for (const prop in obj) {
    if (fn(obj[prop], prop)) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}

function filter(fn, arr) {
  if (arr === undefined) {
    return arrHolder => filter(fn, arrHolder);
  }

  if (arr.length === undefined) {
    return filterObject(fn, arr);
  }
  let index = -1;
  let resIndex = 0;
  const len = arr.length;
  const willReturn = [];

  while (++index < len) {
    const value = arr[index];

    if (fn(value)) {
      willReturn[resIndex++] = value;
    }
  }

  return willReturn;
}

//Taken from https://github.com/getify/Functional-Light-JS/blob/master/ch4.md
function compose(...fns) {
  return result => {
    const list = fns.slice();

    while (list.length > 0) {
      result = list.pop()(result);
    }

    return result;
  };
}

function range(start, end) {
  if (end === undefined) {
    return endHolder => range(start, endHolder);
  }
  const willReturn = [];

  for (let i = start; i < end; i++) {
    willReturn.push(i);
  }

  return willReturn;
}

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return compose(filter(isOdd), range(2))(x);
}

console.log(fn(10));
