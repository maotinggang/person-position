const path = require('path')

module.exports = {
  entry: { index: './index.js' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  mode: 'production',
  // mode: 'development',
  // devtool: 'inline-source-map',
  target: 'node'
}
