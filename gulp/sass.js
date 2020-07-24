import gulp from 'gulp';
import gulpSass from 'gulp-sass';

gulpSass.compiler = require('node-sass');

export function sass(browserSync){
  return function sass(){
    if(!browserSync){
      return gulp.src('./src/**/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./dist'))
    }

    return gulp.src('./src/**/*.scss')
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
  }
}
