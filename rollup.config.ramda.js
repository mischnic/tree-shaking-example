import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/ramda.js',
  output: {
    file: 'dist/rollup.ramda.js',
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
