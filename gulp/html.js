import gulp from 'gulp';

export function html(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
}
