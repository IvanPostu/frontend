const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const del = require('del')
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass')

function cleanTask(){
  return del(['dist'])
}

function htmlTask(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
}

function sassTask(){
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function devserverTask() {
  browserSync.init({
    open:false,
    server: {
      baseDir: "./dist"
    }
  });
}

gulp.task('sass', sassTask);
gulp.task('serve',  function() {

  devserverTask()

  // gulp.watch("app/*.html").on('change', browserSync.reload);
  // gulp.watch("./src/**/*.scss", sassTask);
});


gulp.task('html', htmlTask)
gulp.task('clean', cleanTask)
gulp.task('devserver', devserverTask);
