const path = require('path');
const merge = require('webpack-merge');
const webpackProd = require('./webpack.prod.js')[1];
const specMode = process.env.karma_spec_mode;

module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      { pattern: 'tests/helpers/*.js', watched: false, served: true, included: true },
      { pattern: 'tests/*.js', watched: true, served: true, included: true }
    ],
    autoWatch: false,
    singleRun: true,
    failOnEmptyTestSuite: false,
    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    reporters: ['mocha', 'kjhtml'],
    listenAddress: '0.0.0.0',
    hostname: 'localhost',
    port: 9876,
    retryLimit: 0,
    browserDisconnectTimeout: 50000,
    browserNoActivityTimeout: 50000,
    captureTimeout: 60000,
    client: {
      captureConsole: true,
      clearContext: false,
      runInParent: false,
      useIframe: true,
      jasmine: {
        random: false,
      }
    },
    preprocessors: {
      './tests/helpers/*.js': ['webpack'],
      './tests/*.js': ['webpack']
    },
    webpack: merge(webpackProd, {
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
      }
    }),
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    mochaReporter: {
      output: specMode,  //noFailures, full, autowatch, minimal
      ignoreSkipped: true
    }
  });
};