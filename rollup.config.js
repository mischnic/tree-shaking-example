import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

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
			commonjs()
		],
		output: [{ file: `rollup/${libName}.js`, format: "cjs" }]
	}
];
