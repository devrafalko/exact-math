const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index:'./src/exact-math.js'
  },
  output: {
    filename: 'exact-math.node.js',
    path: path.resolve(__dirname, 'dist'),
    library:'exactMath',
    libraryTarget: 'commonjs2',
    libraryExport:'default',
    globalObject: 'this'
  },
  target:'node',
  externals: [nodeExternals()]
};