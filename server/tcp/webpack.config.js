const path = require('path')

module.exports = {
  entry: { index: './src/index.js' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: []
  },
  mode: 'production',
  // mode: 'development',
  // devtool: 'inline-source-map',
  target: 'node'
}
