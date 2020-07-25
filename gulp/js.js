import gulp from 'gulp'
import gulpIf from 'gulp-if'
import uglify from 'gulp-uglify'
import log from 'fancy-log';

export function js(isDev, browserSync){
  return function js(){
    let resultStream = gulp.src('./src/**/*.js')
      .pipe(gulpIf(isDev, uglify()))
      .pipe(gulp.dest('./dist'))

    if(browserSync){
      const browserSyncStream = browserSync.stream()

      resultStream = resultStream
        .pipe(browserSyncStream)
        .on('end', () => {
          log('Js changes made to browser ')
        })
    }

    return resultStream
  }
}
