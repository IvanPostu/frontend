const glob = require('glob')
const log = require('fancy-log')

module.exports = (isDev) => {

  const jsEntryPoints = glob
    .sync('./src/**/index.js')
    .filter(item => !item.includes('libraries'))
    .reduce((result, item) => (
      result[item.replace('./src/', '')] = item,
      result), {})

  const entryPointsForLog = Object.values(jsEntryPoints)
  log.info('JS entry points: ', entryPointsForLog);

  return {
    entry: jsEntryPoints,
    output: {
      filename: '[name]'
    },
    mode: isDev ? 'development' : 'production',
    watch: false,
    devtool: isDev ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    }
  }
}
