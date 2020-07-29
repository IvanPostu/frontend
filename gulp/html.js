import gulp from 'gulp'
import debug from 'gulp-debug'
import gulpIf from 'gulp-if'
import log from 'fancy-log'

export function html() {
  const isDev = process.env.NODE_ENV === 'development'

  return gulp
    .src('src/**/index.html', { since: gulp.lastRun(html) })
    .pipe(
      gulpIf(
        isDev,
        debug({
          title: 'html',
          logger: (msg) => {
            log(`Processed: ${msg}`)
          }
        })
      )
    )
    .pipe(gulp.dest('dist'))
}
