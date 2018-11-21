const path = require('path');

module.exports = {
  entry: {
    index: './src/exact-math.js'
  },
  output: {
    filename: 'exact-math.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'exactMath',
    libraryTarget: 'var',
    libraryExport: 'default',
    globalObject: 'this'
  },
  target: 'web'
};