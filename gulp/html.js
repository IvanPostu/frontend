import gulp from 'gulp'
import debug from 'gulp-debug'
import gulpIf from 'gulp-if'

export function html() {
  const isDev = process.env.NODE_ENV === 'development'

  return gulp
    .src('src/**/*.html', { since: gulp.lastRun(html) })
    .pipe(gulpIf(isDev, debug({ title: 'html' })))
    .pipe(gulp.dest('dist'))
}
