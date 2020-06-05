# Tree-shaking-example

This is a fork of https://github.com/mischnic/tree-shaking-example that adds [esbuild](https://github.com/evanw/esbuild) for comparison.

```
file                 size      error
-------------------  --------  -----
rollup/lodash-es       18.0kb
parcel/lodash-es       18.8kb
webpack/lodash-es      20.6kb
esbuild/lodash-es      21.3kb

esbuild/lodash         70.4kb
rollup/lodash          70.6kb
webpack/lodash         71.9kb
parcel/lodash          92.6kb

esbuild/rxjs            9.7kb
parcel/rxjs             9.8kb
rollup/rxjs            10.1kb
webpack/rxjs           10.3kb

parcel/react-icons      9.6kb
rollup/react-icons      9.8kb
webpack/react-icons    10.0kb
esbuild/react-icons  1241.9kb

rollup/remeda           2.2kb
esbuild/remeda          2.3kb
parcel/remeda           2.3kb
webpack/remeda          3.1kb

rollup/ramda            6.4kb
parcel/ramda            6.5kb
esbuild/ramda           6.7kb
webpack/ramda           7.3kb

rollup/ramdaBabel       6.5kb
parcel/ramdaBabel       6.9kb
esbuild/ramdaBabel      7.7kb
webpack/ramdaBabel      8.5kb

rollup/rambda           3.7kb
esbuild/rambda          4.1kb
webpack/rambda          4.6kb
parcel/rambda          15.0kb

rollup/rambdax          4.9kb
esbuild/rambdax         7.0kb
webpack/rambdax         7.6kb
parcel/rambdax         25.0kb
```

Note that getting a small size for the `react-icons` benchmark relies on an unsafe transformation where the side effects of assignments to the `displayName` property must be ignored. This is unsafe because the `displayName` property may have a setter that runs other side effects. If those assignments are commented out, esbuild generates a 9.5kb bundle.

## How to use it

1. Run `npm ci`

2. Run `npm start`
