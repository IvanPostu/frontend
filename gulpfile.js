const gulp = require('gulp')
const imagemin = require('gulp-imagemin');

gulp.task('message', function(){
  return new Promise((resolve, reject) => {
    resolve(console.log('running...'))
  })
})

gulp.task('imageMin', function(){
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

gulp.task('copyHtml', function(){
  return new Promise((resolve, reject) => {
    
    const result = gulp.src('src/*.html')
      .pipe(gulp.dest('dist'))

    resolve(result)
  })
})
