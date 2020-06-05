# Tree-shaking-example

This is a fork of https://github.com/mischnic/tree-shaking-example that adds [esbuild](https://github.com/evanw/esbuild) for comparison.

```
file                 size      error
-------------------  --------  -----
rollup/lodash-es       18.0kb
parcel/lodash-es       18.3kb
webpack/lodash-es      20.6kb
esbuild/lodash-es      21.3kb

esbuild/lodash         70.4kb
rollup/lodash          70.6kb
parcel/lodash          70.7kb
webpack/lodash         71.9kb

esbuild/rxjs            9.7kb
parcel/rxjs            10.1kb
rollup/rxjs            10.1kb
webpack/rxjs           10.3kb

parcel/react-icons      9.4kb
rollup/react-icons      9.8kb
webpack/react-icons    10.0kb
esbuild/react-icons  1241.9kb

rollup/remeda           2.2kb
esbuild/remeda          2.3kb
webpack/remeda          3.1kb
parcel/remeda           9.8kb

parcel/ramda            6.3kb
rollup/ramda            6.4kb
esbuild/ramda           6.7kb
webpack/ramda           7.3kb

rollup/ramdaBabel       6.5kb
parcel/ramdaBabel       6.6kb
esbuild/ramdaBabel      7.7kb
webpack/ramdaBabel      8.5kb

parcel/rambda           3.7kb
rollup/rambda           3.7kb
esbuild/rambda          4.1kb
webpack/rambda          4.6kb

rollup/rambdax          4.9kb
parcel/rambdax          6.4kb
esbuild/rambdax         7.0kb
webpack/rambdax         7.6kb

webpack/material-ui    86.5kb
esbuild/material-ui    88.8kb
rollup/material-ui    218.7kb
parcel/material-ui    452.5kb
```

Note that getting a small size for the `react-icons` benchmark relies on an unsafe transformation where the side effects of assignments to the `displayName` property must be ignored. This is unsafe because the `displayName` property may have a setter that runs other side effects. If those assignments are commented out, esbuild generates a 9.5kb bundle.

## How to use it

1. Run `npm ci`

2. Run `npm start`
