import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const libName = process.env.LIB

export default [
  {
    input: `src/${libName}.js`,
    treeshake: true,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    output: [
      { file: `rollup/${libName}.js`, format: 'cjs' }
    ],
  },
]
