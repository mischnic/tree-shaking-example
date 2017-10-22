import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/rambda.es5.js',
  output: {
    file: 'dist/rollup.rambda.es5.js',
    format: 'es'
  },
  legacy: false,
  treeshake: true,
  externalHelpers: false,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
