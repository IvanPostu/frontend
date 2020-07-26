import gulp from 'gulp'
import log from 'fancy-log'
import named from 'vinyl-named'
import webpackStream from 'webpack-stream'

export function js(browserSync) {
  const webpackOptions = require('./webpack.config.js')

  return function js() {
    let resultStream = gulp
      .src('./src/**/*.js')
      .pipe(named())
      .pipe(webpackStream(webpackOptions))
      .pipe(gulp.dest('./dist'))

    if (browserSync) {
      const browserSyncStream = browserSync.stream()

      resultStream = resultStream.pipe(browserSyncStream).on('end', () => {
        log('Js changes made to browser ')
      })
    }

    return resultStream
  }
}
