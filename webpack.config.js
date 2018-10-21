const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default

const libName = process.env.LIB

module.exports = {
  mode: "production",
  entry: `./src/${libName}.js`,
  output: {
    filename: `./webpack/${libName}.js`,
    path: __dirname
  },
  plugins: [
    new PrepackWebpackPlugin(),
    new UglifyJSPlugin(),
  ]
};
