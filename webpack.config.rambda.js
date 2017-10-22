const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/rambda.es5.js',
  output: {
    filename: 'webpack.rambda.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new UglifyJSPlugin({
      compress: {
        dead_code: true
      }
    }),
  ]
};
