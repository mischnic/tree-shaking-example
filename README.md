# Tree-shaking-example

Example implementation of `tree-shaking` and `dead code elimination` of
[Rambda](https://github.com/selfrefactor/rambda), `Ramda`, `Remeda` and `Lodash` with `Webpack`, `Parcel` and `Rollup`.

## Latest detailed results

```
------------------  --------
file                size
------------------  --------
parcel/lodash-es    19.16 KB
rollup/lodash-es    18.22 KB
webpack/lodash-es   20.74 KB

parcel/lodash       91.12 KB
rollup/lodash       69 KB
webpack/lodash      70.57 KB

parcel/remeda       1.96 KB
rollup/remeda       1.89 KB
webpack/remeda      2.8 KB

parcel/ramda        6.35 KB
rollup/ramda        6.25 KB
webpack/ramda       7.16 KB

parcel/ramdaBabel   6.72 KB
rollup/ramdaBabel   6.35 KB
webpack/ramdaBabel  8.39 KB

parcel/rambda       8.85 KB
rollup/rambda       591 B
webpack/rambda      2.19 KB

parcel/rambdax      21.72 KB
rollup/rambdax      4.63 KB
webpack/rambdax     8.3 KB
```

 `ramdaBabel` is what [https://github.com/megawac/babel-plugin-ramda](babel-plugin-ramda) is doing. This means that in order to get best tree-shaking, you need to use `babel`, which is not always what you might want.

## How to use it

1. Run `git clone https://github.com/selfrefactor/tree-shaking-example.git&&cd tree-shaking-example`

2. Run `yarn`

3. Run `yarn start`

## Argumentation

Currently one of the major advantages of `Rambda` over `Ramda` is its out-of-the-box tree-shaking ability. This repo should be the proof of this statement.

It also shows that in terms of tree-shaking, `Rollup` is currently better choice than `Webpack` and `Parcel`.
