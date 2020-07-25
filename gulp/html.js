import gulp from 'gulp';
import debug from 'gulp-debug'

const taskName = 'html'

/**
 * TODO:
 * Write test for compare function name and gulp.lastRun(name)
 */
export function html(){

  //gulp.lastRun(html) - html is function name
  return gulp.src('src/**/*.html', {since: gulp.lastRun(html)})
    .pipe(debug({title: 'html'}))
    .pipe(gulp.dest('dist'))
}

