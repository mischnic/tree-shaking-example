# Tree-shaking-example

```
file                 size      error
-------------------  --------  -----
rollup/lodash-es       18.1kb
parcel/lodash-es       18.6kb
webpack/lodash-es      20.7kb
esbuild/lodash-es      21.4kb

parcel/lodash          68.7kb
rollup/lodash          71.0kb
esbuild/lodash         72.0kb
webpack/lodash         72.3kb

parcel/rxjs             9.7kb
rollup/rxjs            10.2kb
webpack/rxjs           10.3kb
esbuild/rxjs           10.6kb

rollup/react-icons      9.9kb
webpack/react-icons    10.0kb
parcel/react-icons     10.3kb
esbuild/react-icons  1242.5kb

parcel/remeda           2.1kb
rollup/remeda           2.2kb
esbuild/remeda          2.6kb
webpack/remeda          3.1kb

parcel/ramda            6.3kb
rollup/ramda            6.4kb
esbuild/ramda           6.9kb
webpack/ramda           7.3kb

rollup/ramdaBabel       6.5kb
parcel/ramdaBabel       6.6kb
esbuild/ramdaBabel      7.9kb
webpack/ramdaBabel      8.5kb

rollup/rambda           1.2kb
parcel/rambda           2.7kb
esbuild/rambda          3.3kb
webpack/rambda          3.7kb

rollup/rambdax          4.9kb
parcel/rambdax          6.6kb
esbuild/rambdax         6.9kb
webpack/rambdax         7.6kb

rollup/material-ui     86.7kb
webpack/material-ui    87.4kb
parcel/material-ui     89.1kb
esbuild/material-ui    89.8kb

rollup/sentry          67.0kb
esbuild/sentry         68.0kb
webpack/sentry         74.2kb
parcel/sentry          75.6kb
```

Note that getting a small size for the `react-icons` benchmark relies on an unsafe transformation where the side effects of assignments to the `displayName` property must be ignored. This is unsafe because the `displayName` property may have a setter that runs other side effects. If those assignments are commented out, esbuild generates a 9.5kb bundle.

## How to use it

1. Run `npm ci`

2. Run `npm start`
