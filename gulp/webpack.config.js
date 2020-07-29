const glob = require('glob')
const log = require('fancy-log')
const webpack = require('webpack-stream').webpack
const { hashLength } = require('./jsOutputHashLength')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

let jsEntryPointsCache = null

/**
 * Slow function, read all index.js file in dir tree,
 * only if SKIP_SLOW_FUNCTIONS==='true'
 */
function loadEntryPoints() {
  if (process.env.SKIP_SLOW_FUNCTIONS === 'true') {
    log.info('Skip slow function execution in webpack config.')
    return {}
  }

  if (jsEntryPointsCache !== null) {
    log.info('(Using cache) Webpack entry points: ', Object.values(jsEntryPointsCache))
    return jsEntryPointsCache
  }

  const jsEntryPoints = glob.sync('./src/**/index.js').reduce((result, item) => {
    let k = item.replace('./src/', '')
    k = k.replace('.js', '')

    result[k] = item
    return result
  }, {})

  log.info('(Slow FS operation) Webpack entry points: ', Object.values(jsEntryPoints))
  jsEntryPointsCache = jsEntryPoints

  return jsEntryPoints
}

module.exports = {
  entry: loadEntryPoints(),
  output: {
    filename: isProd ? `[name].[contenthash:${hashLength()}].js` : '[name].js',
    hashFunction: 'sha1'
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
    new webpack.ProgressPlugin((percentage /*, message, ...args*/) => {
      if (percentage === 1.0) {
        log.info('Webpack build 100%.')
      }
    })
  ]
}
