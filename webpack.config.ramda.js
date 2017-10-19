const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/ramda.js',
  output: {
    filename: 'webpack.ramda.js',
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
