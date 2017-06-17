const path = require('path')
const fs = require('fs')
let babelRc = JSON.parse(fs.readFileSync('./.babelrc', {encoding: 'utf8'}))
module.exports = {
  entry: {
    'vpaid-ad-inspector': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(bower_components)/,
        use: {
          loader: 'babel-loader',
          options: Object.assign(babelRc, {
            cacheDirectory: true
          })
        }
      }
    ]
  }
}
