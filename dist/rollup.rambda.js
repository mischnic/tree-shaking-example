function curry(fn) {
  return (x, y) => {
    if (y === undefined) {
      return yHolder => fn(x, yHolder);
    }

    return fn(x, y);
  };
}

function add(x, y) {
  return x + y;
}

var add$1 = curry(add);

function filterObject(fn, obj) {
  const willReturn = {};
  for (const prop in obj) {
    if (fn(obj[prop])) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}

function filter(fn, arr) {
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

var filter$1 = curry(filter);

function all(condition, arr) {
  return filter$1(condition, arr).length === arr.length;
}

var all$1 = curry(all);

function any(fn, arr) {
  let counter = 0;
  while (counter < arr.length) {
    if (fn(arr[counter])) {
      return true;
    }
    counter++;
  }

  return false;
}

var any$1 = curry(any);

function append(val, arr) {
  if (typeof arr === 'string') {
    return `${arr}${val}`;
  }
  const clone = arr.concat();
  clone.push(val);

  return clone;
}

var append$1 = curry(append);

function both(x, y) {
  return input => x(input) && y(input);
}

var both$1 = curry(both);

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

function concat(x, y) {

  return typeof x === 'string' ? `${x}${y}` : [...x, ...y];
}

var concat$1 = curry(concat);

function type(a) {
  const typeOf = typeof a;
  if (a === null) {
    return 'Null';
  } else if (a === undefined) {
    return 'Undefined';
  } else if (typeOf === 'boolean') {
    return 'Boolean';
  } else if (typeOf === 'number') {
    return 'Number';
  } else if (typeOf === 'string') {
    return 'String';
  } else if (Array.isArray(a)) {
    return 'Array';
  } else if (a instanceof RegExp) {
    return 'RegExp';
  }

  const asStr = a.toString();

  if (asStr.startsWith('async')) {
    return 'Async';
  } else if (asStr === '[object Promise]') {
    return 'Promise';
  } else if (asStr.includes('function') || asStr.includes('=>')) {
    return 'Function';
  }

  return 'Object';
}

function equals(a, b) {
  if (arguments.length === 1) {
    return bHolder => equals(a, bHolder);
  }

  if (a === b) {
    return true;
  }
  const aType = type(a);
  if (aType !== type(b)) {
    return false;
  }

  if (aType === 'Array') {
    const aClone = Array.from(a);
    const bClone = Array.from(b);

    return aClone.sort().toString() === bClone.sort().toString();
  }

  if (aType === 'Object') {
    const aKeys = Object.keys(a);
    if (aKeys.length === Object.keys(b).length) {
      if (aKeys.length === 0) {
        return true;
      }
      let flag = true;
      aKeys.map(val => {
        if (flag) {
          const aValType = type(a[val]);
          const bValType = type(b[val]);
          if (aValType === bValType) {
            if (aValType === 'Object') {
              if (Object.keys(a[val]).length === Object.keys(b[val]).length) {
                if (Object.keys(a[val]).length !== 0) {
                  if (!equals(a[val], b[val])) {
                    flag = false;
                  }
                }
              } else {
                flag = false;
              }
            } else if (!equals(a[val], b[val])) {
              flag = false;
            }
          } else {
            flag = false;
          }
        }
      });

      return flag;
    }
  }

  return false;
}

function contains(val, arr) {
  let index = -1;
  let flag = false;
  while (++index < arr.length && !flag) {
    if (equals(arr[index], val)) {
      flag = true;
    }
  }

  return flag;
}

var contains$1 = curry(contains);

function divide(x, y) {
  return x / y;
}

var divide$1 = curry(divide);

function drop(dropNumber, a) {
  return a.slice(dropNumber);
}

var drop$1 = curry(drop);

function dropLast(dropNumber, a) {
  return a.slice(0, -dropNumber);
}

var dropLast$1 = curry(dropLast);

function either(x, y) {
  return input => x(input) || y(input);
}

var either$1 = curry(either);

function endsWith(x, y) {
  return y.endsWith(x);
}

var endsWith$1 = curry(endsWith);

function find(fn, arr) {
  return arr.find(fn);
}

var find$1 = curry(find);

function findIndex(fn, arr) {
  const length = arr.length;
  let index = -1;

  while (++index < length) {
    if (fn(arr[index])) {
      return index;
    }
  }

  return -1;
}

var findIndex$1 = curry(findIndex);

function tap(fn, input) {
  fn(input);

  return input;
}

var tap$1 = curry(tap);

function mapObject(fn, obj) {
  const willReturn = {};
  for (const prop in obj) {
    willReturn[prop] = fn(obj[prop]);
  }

  return willReturn;
}

function map(fn, arr) {
  if (arr.length === undefined) {
    return mapObject(fn, arr);
  }
  let index = -1;
  const length = arr.length;
  const willReturn = Array(length);

  while (++index < length) {
    willReturn[index] = fn(arr[index]);
  }

  return willReturn;
}

var map$1 = curry(map);

function forEach(fn, arr) {
  return map$1(tap$1(fn), arr);
}

var forEach$1 = curry(forEach);

function has(prop, obj) {
  return obj[prop] !== undefined;
}

var has$1 = curry(has);

function includes(x, y) {
  return y.includes(x);
}

var includes$1 = curry(includes);

function indexOf(x, arr) {
  let index = -1;
  const length = arr.length;

  while (++index < length) {
    if (arr[index] === x) {
      return index;
    }
  }

  return -1;
}

var indexOf$1 = curry(indexOf);

function baseSlice(array, start, end) {
  let index = -1;
  let length = array.length;

  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  const result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

function join(glue, arr) {
  return arr.join(glue);
}

var join$1 = curry(join);

function lastIndexOf(x, arr) {
  let willReturn = -1;
  arr.map((value, key) => {
    if (equals(value, x)) {
      willReturn = key;
    }
  });

  return willReturn;
}

var lastIndexOf$1 = curry(lastIndexOf);

function match(regex, str) {
  const willReturn = str.match(regex);

  return willReturn === null ? [] : willReturn;
}

var match$1 = curry(match);

function merge(obj, newProps) {
  return Object.assign({}, obj, newProps);
}

var merge$1 = curry(merge);

function modulo(x, y) {
  return x % y;
}

var modulo$1 = curry(modulo);

function multiply(x, y) {
  return x * y;
}

var multiply$1 = curry(multiply);

function pluck(keyToPluck, arr) {
  const willReturn = [];
  map$1(val => {
    if (!(val[keyToPluck] === undefined)) {
      willReturn.push(val[keyToPluck]);
    }
  }, arr);

  return willReturn;
}

var pluck$1 = curry(pluck);

function prepend(val, arr) {
  if (typeof arr === 'string') {
    return `${val}${arr}`;
  }
  const clone = arr.concat();
  clone.unshift(val);

  return clone;
}

var prepend$1 = curry(prepend);

function prop(key, obj) {
  return obj[key];
}

var prop$1 = curry(prop);

function range(start, end) {
  const willReturn = [];
  for (let i = start; i < end; i++) {
    willReturn.push(i);
  }

  return willReturn;
}

function reject(predicate, collection) {
  return filter$1(x => !predicate(x), collection);
}

var reject$1 = curry(reject);

function repeat(a, num) {
  const willReturn = Array(num);

  return willReturn.fill(a);
}

var repeat$1 = curry(repeat);

function sort(fn, arr) {
  const arrClone = arr.concat();

  return arrClone.sort(fn);
}

var sort$1 = curry(sort);

function sortBy(fn, arr) {
  const arrClone = arr.concat();

  return arrClone.sort((a, b) => {
    const fnA = fn(a);
    const fnB = fn(b);

    return fnA < fnB ? -1 : fnA > fnB ? 1 : 0;
  });
}

var sortBy$1 = curry(sortBy);

function split(glue, str) {
  return str.split(glue);
}

var split$1 = curry(split);

function splitEvery(num, a) {
  num = num > 1 ? num : 1;

  const willReturn = [];
  let counter = 0;
  while (counter < a.length) {
    willReturn.push(a.slice(counter, counter += num));
  }

  return willReturn;
}

var splitEvery$1 = curry(splitEvery);

function startsWith(x, y) {
  return y.startsWith(x);
}

var startsWith$1 = curry(startsWith);

function subtract(x, y) {
  return x - y;
}

var subtract$1 = curry(subtract);

function take(takeNumber, a) {
  if (typeof a === 'string') {
    return a.slice(0, takeNumber);
  }

  return baseSlice(a, 0, takeNumber);
}

var take$1 = curry(take);

function takeLast(takeNumber, a) {
  const len = a.length;
  takeNumber = takeNumber > len ? len : takeNumber;

  if (typeof a === 'string') {
    return a.slice(len - takeNumber);
  }
  takeNumber = len - takeNumber;

  return baseSlice(a, takeNumber, len);
}

var takeLast$1 = curry(takeLast);

function test(regex, str) {
  return str.search(regex) !== -1;
}

var test$1 = curry(test);

function times(fn, n) {
  return map$1(fn, range(0, n));
}

var times$1 = curry(times);

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return compose(filter$1(isOdd), range(2))(x);
}

console.log(fn(10));
