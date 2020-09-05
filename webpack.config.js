const path = require('path');
const merge = require('webpack-merge').merge;
const nodeExternals = require('webpack-node-externals');
const StylesLoader = require('styles-loader');
const TerserPlugin = require('terser-webpack-plugin');
const stylesLoader = new StylesLoader({
  extract: 'bundled.css'
});

const common = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

const backend = {
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

const frontend = {
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

const simulator = merge(stylesLoader, {
  entry: {
    index: './simulator/prod/index.js'
  },
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'simulator/dist'),
    library: 'bundled',
    libraryTarget: 'var',
    libraryExport: 'default',
    globalObject: 'this'
  },
  target: 'web'
});

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

const prod = {
  mode: 'production',
  watch: false,
  stats: false,
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};

module.exports = (env) => {
  const mode = env.prod ? prod : dev;
  return [
    merge(common, mode, backend),
    merge(common, mode, frontend),
    merge(common, mode, simulator)
  ];
};