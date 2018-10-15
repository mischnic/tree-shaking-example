const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const libName = process.env.LIB

module.exports = {
  mode: "production",
  entry: `./src/${libName}.js`,
  output: {
    filename: `./webpack/${libName}.js`,
    path: __dirname
  },
  plugins: [
    new UglifyJSPlugin(),
  ]
};
