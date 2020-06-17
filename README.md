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

parcel/react-icons      9.3kb
rollup/react-icons      9.8kb
webpack/react-icons    10.0kb
esbuild/react-icons  1241.9kb

rollup/remeda           2.2kb
esbuild/remeda          2.3kb
webpack/remeda          3.1kb
parcel/remeda           7.1kb

parcel/ramda            6.3kb
rollup/ramda            6.4kb
esbuild/ramda           6.7kb
webpack/ramda           7.3kb

rollup/ramdaBabel       6.5kb
parcel/ramdaBabel       6.6kb
esbuild/ramdaBabel      7.7kb
webpack/ramdaBabel      8.5kb

rollup/rambda           1.2kb
parcel/rambda           2.8kb
esbuild/rambda          3.2kb
webpack/rambda          3.7kb

rollup/rambdax          4.9kb
parcel/rambdax          6.4kb
esbuild/rambdax         7.0kb
webpack/rambdax         7.6kb

rollup/material-ui     85.6kb
webpack/material-ui    86.0kb
esbuild/material-ui    88.3kb
parcel/material-ui    445.8kb

rollup/sentry          59.4kb
parcel/sentry          63.7kb
webpack/sentry         65.1kb
esbuild/sentry         66.8kb
```

Note that getting a small size for the `react-icons` benchmark relies on an unsafe transformation where the side effects of assignments to the `displayName` property must be ignored. This is unsafe because the `displayName` property may have a setter that runs other side effects. If those assignments are commented out, esbuild generates a 9.5kb bundle.

## How to use it

1. Run `npm ci`

2. Run `npm start`
