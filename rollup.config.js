import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

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
			commonjs(),
			terser({ sourcemap: false, toplevel: true })
		],
		output: [{ file: `rollup/${libName}.js`, format: "cjs" }]
	}
];
