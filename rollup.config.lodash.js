import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/lodash.js',
  output: {
    file: 'dist/rollup.lodash.js',
    format: 'es'
  },
  legacy: false,
  treeshake: true,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
