const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const frontEnd = require('./webpack.frontend.js');
const backEnd = require('./webpack.backend.js');
const simulator = require('./webpack.simulator.js');

const dev = {
  mode: 'development',
  watch: true,
  stats: {
    version: false,
    colors: true,
    warnings: false,
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    providedExports: false,
    publicPath: false,
    timings: true,
    usedExports: false
  }
};

module.exports = [
  merge(common, dev, backEnd),
  merge(common, dev, frontEnd),
  merge(common, dev, simulator)
];