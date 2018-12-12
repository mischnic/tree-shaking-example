const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const libName = process.env.LIB;

module.exports = {
	mode: "production",
	entry: `./src/${libName}.js`,
	output: {
		filename: `./webpack/${libName}.js`,
		path: __dirname
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	optimization: {
		minimizer: [new TerserPlugin()]
	},
	plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};
