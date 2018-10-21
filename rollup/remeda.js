'use strict';

/**
 * Creates a function with `data-first` and `data-last` signatures.
 *
 * `purry` is a dynamic function and it's not type safe. It should be wrapped by a function that have proper typings.
 * Refer to the example below to see usage a correct usage.
 *
 * @param fn the function to purry.
 * @param args the arguments
 * @signature R.purry(fn, arguments);
 * @example-raw
 *    function _findIndex(array, fn) {
 *      for (let i = 0; i < array.length; i++) {
 *        if (fn(array[i])) {
 *          return i;
 *        }
 *      }
 *      return -1;
 *    }
 *
 *    // data-first
 *    function findIndex<T>(array: T[], fn: (item: T) => boolean): number;
 *
 *    // data-last
 *    function findIndex<T>(fn: (item: T) => boolean): (array: T[]) => number;
 *
 *    function findIndex() {
 *      return R.purry(_findIndex, arguments);
 *    }
 * @category Function
 */
function purry(fn, args, lazy) {
    var diff = fn.length - args.length;
    var arrayArgs = Array.from(args);
    if (diff === 0) {
        return fn.apply(void 0, arrayArgs);
    }
    if (diff === 1) {
        var ret = function (data) { return fn.apply(void 0, [data].concat(arrayArgs)); };
        if (lazy || fn.lazy) {
            ret.lazy = lazy || fn.lazy;
            ret.lazyArgs = args;
        }
        return ret;
    }
    throw new Error('Wrong number of arguments');
}

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

// from https://github.com/ramda/ramda/blob/master/source/type.js

// from https://github.com/ramda/ramda/blob/master/source/internal/_clone.js

/**
 * Filter out all falsey values. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 * @param items the array to compact
 * @signature
 *    R.compact(array)
 * @example
 *    R.compact([0, 1, false, 2, '', 3]) // => [1, 2, 3]
 * @category Array
 * @pipeable
 */

function pipe(value) {
    var operations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        operations[_i - 1] = arguments[_i];
    }
    var ret = value;
    var lazyOps = operations.map(function (op) {
        var _a = op, lazy = _a.lazy, lazyArgs = _a.lazyArgs;
        if (lazy) {
            var fn = lazy.apply(void 0, lazyArgs);
            fn.indexed = lazy.indexed;
            fn.single = lazy.single;
            fn.index = 0;
            fn.items = [];
            return fn;
        }
        return null;
    });
    var opIdx = 0;
    while (opIdx < operations.length) {
        var op = operations[opIdx];
        var lazyOp = lazyOps[opIdx];
        if (!lazyOp) {
            ret = op(ret);
            opIdx++;
            continue;
        }
        var lazySeq = [];
        for (var j = opIdx; j < operations.length; j++) {
            if (lazyOps[j]) {
                lazySeq.push(lazyOps[j]);
                if (lazyOps[j].single) {
                    break;
                }
            }
            else {
                break;
            }
        }
        var acc = [];
        for (var j = 0; j < ret.length; j++) {
            var item = ret[j];
            if (_processItem({ item: item, acc: acc, lazySeq: lazySeq })) {
                break;
            }
        }
        var lastLazySeq = lazySeq[lazySeq.length - 1];
        if (lastLazySeq.single) {
            ret = acc[0];
        }
        else {
            ret = acc;
        }
        opIdx += lazySeq.length;
    }
    return ret;
}
function _processItem(_a) {
    var item = _a.item, lazySeq = _a.lazySeq, acc = _a.acc;
    var lazyResult;
    for (var i = 0; i < lazySeq.length; i++) {
        var lazyFn = lazySeq[i];
        var indexed = lazyFn.indexed;
        var index = lazyFn.index;
        var items = lazyFn.items;
        items.push(item);
        lazyResult = indexed ? lazyFn(item, index, items) : lazyFn(item);
        lazyFn.index++;
        if (lazyResult.hasNext) {
            if (lazyResult.hasMany) {
                var nextValues = lazyResult.next;
                for (var _i = 0, nextValues_1 = nextValues; _i < nextValues_1.length; _i++) {
                    var subItem = nextValues_1[_i];
                    var subResult = _processItem({
                        item: subItem,
                        acc: acc,
                        lazySeq: lazySeq.slice(i + 1),
                    });
                    if (subResult) {
                        return true;
                    }
                }
                return false;
            }
            else {
                item = lazyResult.next;
            }
        }
        if (!lazyResult.hasNext || lazyResult.done) {
            break;
        }
    }
    if (lazyResult.hasNext) {
        acc.push(item);
    }
    if (lazyResult.done) {
        return true;
    }
    return false;
}

function _reduceLazy(array, lazy, indexed) {
    return array.reduce(function (acc, item, index) {
        var result = indexed ? lazy(item, index, array) : lazy(item);
        if (result.hasMany) {
            acc.push.apply(acc, result.next);
        }
        else if (result.hasNext) {
            acc.push(result.next);
        }
        return acc;
    }, []);
}

function difference() {
    return purry(_difference, arguments, difference.lazy);
}
function _difference(array, other) {
    var lazy = difference.lazy(other);
    return _reduceLazy(array, lazy);
}
(function (difference) {
    function lazy(other) {
        return function (value) {
            var set = new Set(other);
            if (!set.has(value)) {
                return {
                    done: false,
                    hasNext: true,
                    next: value,
                };
            }
            return {
                done: false,
                hasNext: false,
            };
        };
    }
    difference.lazy = lazy;
})(difference || (difference = {}));

function drop() {
    return purry(_drop, arguments, drop.lazy);
}
function _drop(array, n) {
    return _reduceLazy(array, drop.lazy(n));
}
(function (drop) {
    function lazy(n) {
        var left = n;
        return function (value) {
            if (left > 0) {
                left--;
                return {
                    done: false,
                    hasNext: false,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        };
    }
    drop.lazy = lazy;
})(drop || (drop = {}));

var _toLazyIndexed = function (fn) {
    fn.indexed = true;
    return fn;
};

function filter() {
    return purry(_filter(false), arguments, filter.lazy);
}
var _filter = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? filter.lazyIndexed(fn) : filter.lazy(fn), indexed);
}; };
var _lazy = function (indexed) { return function (fn) {
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        return {
            done: false,
            hasNext: valid,
            next: value,
        };
    };
}; };
(function (filter) {
    function indexed() {
        return purry(_filter(true), arguments, filter.lazyIndexed);
    }
    filter.indexed = indexed;
    filter.lazy = _lazy(false);
    filter.lazyIndexed = _toLazyIndexed(_lazy(true));
})(filter || (filter = {}));

var _toSingle = function (fn) {
    fn.single = true;
    return fn;
};

function find() {
    return purry(_find(false), arguments, find.lazy);
}
var _find = function (indexed) { return function (array, fn) {
    if (indexed) {
        return array.find(fn);
    }
    return array.find(function (x) { return fn(x); });
}; };
var _lazy$1 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        return {
            done: valid,
            hasNext: valid,
            next: value,
        };
    };
}; };
(function (find) {
    function indexed() {
        return purry(_find(true), arguments, find.lazyIndexed);
    }
    find.indexed = indexed;
    find.lazy = _toSingle(_lazy$1(false));
    find.lazyIndexed = _toSingle(_toLazyIndexed(_lazy$1(true)));
})(find || (find = {}));

function findIndex() {
    return purry(_findIndex(false), arguments, findIndex.lazy);
}
var _findIndex = function (indexed) { return function (array, fn) {
    if (indexed) {
        return array.findIndex(fn);
    }
    return array.findIndex(function (x) { return fn(x); });
}; };
var _lazy$2 = function (indexed) { return function (fn) {
    var i = 0;
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        if (valid) {
            return {
                done: true,
                hasNext: true,
                next: i,
            };
        }
        i++;
        return {
            done: false,
            hasNext: false,
        };
    };
}; };
(function (findIndex) {
    function indexed() {
        return purry(_findIndex(true), arguments, findIndex.lazyIndexed);
    }
    findIndex.indexed = indexed;
    findIndex.lazy = _toSingle(_lazy$2(false));
    findIndex.lazyIndexed = _toSingle(_toLazyIndexed(_lazy$2(true)));
})(findIndex || (findIndex = {}));

function first() {
    return purry(_first, arguments, first.lazy);
}
function _first(array) {
    return array[0];
}
(function (first) {
    function lazy() {
        return function (value) {
            return {
                done: true,
                hasNext: true,
                next: value,
            };
        };
    }
    first.lazy = lazy;
    (function (lazy) {
        lazy.single = true;
    })(lazy = first.lazy || (first.lazy = {}));
})(first || (first = {}));

function flatten() {
    return purry(_flatten, arguments, flatten.lazy);
}
function _flatten(items) {
    return _reduceLazy(items, flatten.lazy());
}
(function (flatten) {
    function lazy() {
        return function (next) {
            if (Array.isArray(next)) {
                return {
                    done: false,
                    hasNext: true,
                    hasMany: true,
                    next: next,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: next,
            };
        };
    }
    flatten.lazy = lazy;
})(flatten || (flatten = {}));

function flatMap() {
    return purry(_flatMap, arguments, flatMap.lazy);
}
function _flatMap(array, fn) {
    return flatten(array.map(function (item) { return fn(item); }));
}
(function (flatMap) {
    function lazy(fn) {
        return function (value) {
            var next = fn(value);
            if (Array.isArray(next)) {
                return {
                    done: false,
                    hasNext: true,
                    hasMany: true,
                    next: next,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: next,
            };
        };
    }
    flatMap.lazy = lazy;
})(flatMap || (flatMap = {}));

function flattenDeep() {
    return purry(_flattenDeep, arguments, flattenDeep.lazy);
}
function _flattenDeep(items) {
    return _reduceLazy(items, flattenDeep.lazy());
}
function _flattenDeepValue(value) {
    if (!Array.isArray(value)) {
        return value;
    }
    var ret = [];
    value.forEach(function (item) {
        if (Array.isArray(item)) {
            ret.push.apply(ret, flattenDeep(item));
        }
        else {
            ret.push(item);
        }
    });
    return ret;
}
(function (flattenDeep) {
    function lazy() {
        return function (value) {
            var next = _flattenDeepValue(value);
            if (Array.isArray(next)) {
                return {
                    done: false,
                    hasNext: true,
                    hasMany: true,
                    next: next,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: next,
            };
        };
    }
    flattenDeep.lazy = lazy;
})(flattenDeep || (flattenDeep = {}));

function forEach() {
    return purry(_forEach(false), arguments, forEach.lazy);
}
var _forEach = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? forEach.lazyIndexed(fn) : forEach.lazy(fn), indexed);
}; };
var _lazy$3 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        if (indexed) {
            fn(value, index, array);
        }
        else {
            fn(value);
        }
        return {
            done: false,
            hasNext: true,
            next: value,
        };
    };
}; };
(function (forEach) {
    function indexed() {
        return purry(_forEach(true), arguments, forEach.lazyIndexed);
    }
    forEach.indexed = indexed;
    forEach.lazy = _lazy$3(false);
    forEach.lazyIndexed = _toLazyIndexed(_lazy$3(true));
})(forEach || (forEach = {}));

/**
 * Splits a collection into sets, grouped by the result of running each value through `fn`.
 * @param fn the grouping function
 * @signature
 *    R.groupBy(fn)(array)
 * @example
 *    R.pipe(['one', 'two', 'three'], R.groupBy(x => x.length)) // => {3: ['one', 'two'], 5: ['three']}
 * @data_last
 * @indexed
 * @category Array
 */
function groupBy() {
    return purry(_groupBy(false), arguments);
}
var _groupBy = function (indexed) { return function (array, fn) {
    var ret = {};
    array.forEach(function (item, index) {
        var value = indexed ? fn(item, index, array) : fn(item);
        var key = String(value);
        if (!ret[key]) {
            ret[key] = [];
        }
        ret[key].push(item);
    });
    return ret;
}; };
(function (groupBy) {
    function indexed() {
        return purry(_groupBy(true), arguments);
    }
    groupBy.indexed = indexed;
})(groupBy || (groupBy = {}));

function indexBy() {
    return purry(_indexBy(false), arguments);
}
var _indexBy = function (indexed) { return function (array, fn) {
    return array.reduce(function (ret, item, index) {
        var value = indexed ? fn(item, index, array) : fn(item);
        var key = String(value);
        ret[key] = item;
        return ret;
    }, {});
}; };
(function (indexBy) {
    function indexed() {
        return purry(_indexBy(true), arguments);
    }
    indexBy.indexed = indexed;
})(indexBy || (indexBy = {}));

function intersection() {
    return purry(_intersection, arguments, intersection.lazy);
}
function _intersection(array, other) {
    var lazy = intersection.lazy(other);
    return _reduceLazy(array, lazy);
}
(function (intersection) {
    function lazy(other) {
        return function (value) {
            var set = new Set(other);
            if (set.has(value)) {
                return {
                    done: false,
                    hasNext: true,
                    next: value,
                };
            }
            return {
                done: false,
                hasNext: false,
            };
        };
    }
    intersection.lazy = lazy;
})(intersection || (intersection = {}));

/**
 * Gets the last element of `array`.
 * @param array the array
 * @signature
 *    R.last(array)
 * @example
 *    R.last([1, 2, 3]) // => 3
 *    R.last([]) // => undefined
 * @category Array
 */

function map() {
    return purry(_map(false), arguments, map.lazy);
}
var _map = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? map.lazyIndexed(fn) : map.lazy(fn), indexed);
}; };
var _lazy$4 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        return {
            done: false,
            hasNext: true,
            next: indexed ? fn(value, index, array) : fn(value),
        };
    };
}; };
(function (map) {
    function indexed() {
        return purry(_map(true), arguments, map.lazyIndexed);
    }
    map.indexed = indexed;
    map.lazy = _lazy$4(false);
    map.lazyIndexed = _toLazyIndexed(_lazy$4(true));
})(map || (map = {}));

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

/**
 * A function that returns always `undefined`.
 * @signature
 *    R.noop()
 * @example
 *    onSomething(R.noop)
 * @category Function
 */

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 * @param fn the function to wrap
 * @signature R.once(fn)
 * @example
 * const initialize = R.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 * @category Function
 */

/**
 * Gets the value of the given property.
 * @param name the property name
 * @signature R.prop(prop)(object)
 * @example
 *    R.pipe({foo: 'bar'}, R.prop('foo')) // => 'bar'
 * @data_last
 * @category Object
 */

function range() {
    return purry(_range, arguments);
}
function _range(start, end) {
    var ret = [];
    for (var i = start; i < end; i++) {
        ret.push(i);
    }
    return ret;
}

function reduce() {
    return purry(_reduce(false), arguments);
}
var _reduce = function (indexed) { return function (items, fn, initialValue) {
    return items.reduce(function (acc, item, index) {
        return indexed ? fn(acc, item, index, items) : fn(acc, item);
    }, initialValue);
}; };
(function (reduce) {
    function indexed() {
        return purry(_reduce(true), arguments);
    }
    reduce.indexed = indexed;
})(reduce || (reduce = {}));

function reject() {
    return purry(_reject(false), arguments, reject.lazy);
}
var _reject = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? reject.lazyIndexed(fn) : reject.lazy(fn), indexed);
}; };
var _lazy$5 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        return {
            done: false,
            hasNext: !valid,
            next: value,
        };
    };
}; };
(function (reject) {
    function indexed() {
        return purry(_reject(true), arguments, reject.lazyIndexed);
    }
    reject.indexed = indexed;
    reject.lazy = _lazy$5(false);
    reject.lazyIndexed = _toLazyIndexed(_lazy$5(true));
})(reject || (reject = {}));

var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function take() {
    return purry(_take, arguments, take.lazy);
}
function _take(array, n) {
    return _reduceLazy(array, take.lazy(n));
}
(function (take) {
    function lazy(n) {
        return function (value) {
            if (n === 0) {
                return {
                    done: true,
                    hasNext: false,
                };
            }
            n--;
            if (n === 0) {
                return {
                    done: true,
                    hasNext: true,
                    next: value,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        };
    }
    take.lazy = lazy;
})(take || (take = {}));

/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object
 * @signature
 *    R.toPairs(object)
 * @example
 *    R.toPairs({ a: 1, b: 2, c: 3 }) // => [['a', 1], ['b', 2], ['c', 3]]
 * @category Object
 */

function uniq() {
    return purry(_uniq, arguments, uniq.lazy);
}
function _uniq(array) {
    return _reduceLazy(array, uniq.lazy());
}
(function (uniq) {
    function lazy() {
        var set = new Set();
        return function (value) {
            if (set.has(value)) {
                return {
                    done: false,
                    hasNext: false,
                };
            }
            set.add(value);
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        };
    }
    uniq.lazy = lazy;
})(uniq || (uniq = {}));

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return pipe(x, function (x) {
    return range(2, x);
  }, function (x) {
    return filter(x, isOdd);
  });
}

console.log(fn(10));
