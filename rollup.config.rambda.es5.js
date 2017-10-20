import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/rambda.js',
  output: {
    file: 'dist/rollup.rambda.js',
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
