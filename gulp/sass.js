import gulp from 'gulp'
import gulpIf from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import gulpSass from 'gulp-sass'
import log from 'fancy-log'

gulpSass.compiler = require('node-sass')

export function sass(browserSync) {
  const isDev = process.env.NODE_ENV === 'development'

  return function sass() {
    let resultStream = gulp
      .src('./src/**/*.scss', { since: gulp.lastRun(sass) })
      .pipe(gulpIf(isDev, sourcemaps.init()))
      .pipe(
        gulpSass({ outputStyle: isDev ? 'expanded' : 'compressed' }).on('error', gulpSass.logError)
      )
      .pipe(gulpIf(isDev, sourcemaps.write('.')))
      .pipe(gulp.dest('./dist'))

    if (browserSync) {
      const browserSyncStream = browserSync.stream()

      resultStream = resultStream.pipe(browserSyncStream).on('end', () => {
        log('Sass changes made to browser ')
      })
    }

    return resultStream
  }
}
