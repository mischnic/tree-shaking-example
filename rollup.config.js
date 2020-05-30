import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import react from 'react';

const libName = process.env.LIB;

export default [
	{
		input: `src/${libName}.js`,
		treeshake: true,
		plugins: [
			resolve(),
			babel({
				exclude: "node_modules/**"
			}),
			commonjs({
				namedExports: {
					react: Object.keys(react),
				}
			}),
			terser({
				compress: {
					global_defs: {
						"process.env.NODE_ENV": "production"
					}
				},
				sourcemap: false,
				toplevel: true
			})
		],
		output: [{ file: `rollup/${libName}.js`, format: "cjs" }]
	}
];
