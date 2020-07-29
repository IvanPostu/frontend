import gulp from 'gulp'
import gulpImagemin from 'gulp-imagemin'

export function imagemin() {
  return gulp.src('src/assets/images/*').pipe(gulpImagemin()).pipe(gulp.dest('dist/assets/images/'))
}
