# Tree-shaking-example

Example implementation of `tree-shaking` and `dead code elimination` of
[Rambda](https://github.com/selfrefactor/rambda), `Ramda`, `Remeda` and `Lodash` with `Webpack`, `Parcel` and `Rollup`.

## Latest results

```
------------------  --------
file                size
------------------  --------
rollup/ramdaBabel   276 B
rollup/lodash       278 B
rollup/rambda       785 B
parcel/ramdaBabel   1.23 KB
parcel/lodash       1.2 KB
parcel/rambda       1.2 KB
parcel/ramda        1.2 KB
parcel/rambdax      1.2 KB
parcel/remeda       1.2 KB
webpack/rambda      2 KB
webpack/remeda      2.68 KB
webpack/rambdax     4.79 KB
webpack/ramda       7.3 KB
webpack/ramdaBabel  8.36 KB
rollup/remeda       20.48 KB
rollup/rambdax      20.77 KB
webpack/lodash      70.76 KB
rollup/ramda        92.16 KB
```

 `ramdaBabel` is what [https://github.com/megawac/babel-plugin-ramda](babel-plugin-ramda) is doing. This means that in order to get best tree-shaking, you need to use `babel`, which is not always what you might want.

## How to use it

1. Run `git clone https://github.com/selfrefactor/tree-shaking-example.git&&cd tree-shaking-example`

2. Run `yarn`

3. Run `yarn start`

## Argumentation

Currently one of the major advantages of `Rambda` over `Ramda` is its out-of-the-box tree-shaking ability. This repo should be the proof of this statement.

It also shows that in terms of tree-shaking, `Rollup` is currently better choice than `Webpack` and `Parcel`.
