const glob = require('glob')
const log = require('fancy-log')
const webpack = require('webpack-stream').webpack

const isDev = process.env.NODE_ENV === 'development'

/**
 * Slow function, read all index.js file in dir tree, 
 * only if NODE_ENV=production || development.
 */
function loadEntryPoints() {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
    log.info('Skip slow function execution in webpack config.')
    return {}
  }

  const jsEntryPoints = glob
    .sync('./src/**/index.js')
    .reduce((result, item) => (
      result[item.replace('./src/', '')] = item,
      result), {})

  const entryPointsForLog = Object.values(jsEntryPoints)

  log.info('(Slow FS operation) Webpack entry points: ', entryPointsForLog)

  return jsEntryPoints
}

module.exports = {
  entry: loadEntryPoints(),
  output: {
    filename: '[name]'
  },
  mode: process.env.NODE_ENV,
  watch: false,
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      if (percentage === 1.0) {
        log.info('Webpack build 100%.')
      }
    })
  ]
}
