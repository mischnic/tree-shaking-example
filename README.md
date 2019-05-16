# Tree-shaking-example

```
-------------------  --------  -------------------------
file                 size      coverage
-------------------  --------  --------------------------
parcel/lodash-es     19.16 KB  Stmts: 45%, Functions: 36%
rollup/lodash-es     18.22 KB  Stmts: 40%, Functions: 32%
webpack/lodash-es    20.74 KB  Stmts: 49%, Functions: 37%

parcel/lodash        91.12 KB  Stmts: 19%, Functions: 13%
rollup/lodash        69 KB     Stmts: 23%, Functions: 14%
webpack/lodash       70.57 KB  Stmts: 24%, Functions: 16%

parcel/rxjs          9.46 KB   Stmts: 57%, Functions: 59%
rollup/rxjs          9.08 KB   Stmts: 58%, Functions: 59%
webpack/rxjs         10.82 KB  Stmts: 56%, Functions: 57%

parcel/react-icons   1.19 MB   Runtime error!
rollup/react-icons   9.18 KB   Stmts: 24%, Functions: 10%
webpack/react-icons  10.42 KB  Stmts: 25%, Functions: 15%

parcel/remeda        1.96 KB   Stmts: 53%, Functions: 87%
rollup/remeda        1.89 KB   Stmts: 52%, Functions: 85%
webpack/remeda       2.8 KB    Stmts: 47%, Functions: 68%

parcel/ramda         6.35 KB   Stmts: 48%, Functions: 51%
rollup/ramda         6.25 KB   Stmts: 47%, Functions: 49%
webpack/ramda        7.16 KB   Stmts: 46%, Functions: 47%

parcel/ramdaBabel    6.72 KB   Stmts: 61%, Functions: 51%
rollup/ramdaBabel    6.35 KB   Stmts: 53%, Functions: 49%
webpack/ramdaBabel   8.39 KB   Stmts: 60%, Functions: 60%

parcel/rambda        8.85 KB   Stmts:  8%, Functions:  6%
rollup/rambda        591 B     Stmts: 83%, Functions: 88%
webpack/rambda       2.19 KB   Stmts: 43%, Functions: 39%

parcel/rambdax       21.72 KB  Stmts: 14%, Functions:  7%
rollup/rambdax       4.63 KB   Stmts: 52%, Functions: 38%
webpack/rambdax      8.3 KB    Stmts: 42%, Functions: 36%
```

 `ramdaBabel` is what [https://github.com/megawac/babel-plugin-ramda](babel-plugin-ramda) is doing. This means that in order to get best tree-shaking, you need to use `babel`, which is not always what you might want.

## How to use it

1. Run `git clone https://github.com/selfrefactor/tree-shaking-example.git&&cd tree-shaking-example`

2. Run `yarn`

3. Run `yarn start`
