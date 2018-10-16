# Tree-shaking-example

Example implementation of `tree-shaking` and `dead code elimination` of
[Rambda](https://github.com/selfrefactor/rambda) and `Ramda` with `Webpack` and `Rollup`.

## Notes

- `Rollup` bundle of  `lodash` is not working for whatever reason

- `ramdaBabel` is what [https://github.com/megawac/babel-plugin-ramda](babel-plugin-ramda) is doing

## How to use it

1. Run `git clone https://github.com/selfrefactor/tree-shaking-example.git&&cd tree-shaking-example`

2. Run `yarn install`

3. Run `yarn start`

## Argumentation

Currently the major advantage of `Rambda` over `Ramda` is its tree-shaking ability and this repo
is the proof of this statement.

It also shows that in terms of tree-shaking, `Rollup` is currently better choice than `Webpack`.
