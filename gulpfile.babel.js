require('./gulp/dotenvFileResolver').resolve()
import gulp from 'gulp'
import { clean } from './gulp/clean'
import { html } from './gulp/html'
import { sass } from './gulp/sass'
import { test } from './gulp/test';
import { js } from './gulp/js'
import { initServer } from './gulp/initServer'
import { build } from './gulp/build'

function serve(){
  const browserSync = require('browser-sync').create()
  initServer(browserSync)
  
  gulp.watch('src/**/*.html').on('change', 
    gulp.series(html, browserSync.reload)
  );
  
  gulp.watch("./src/**/*.scss", sass(browserSync));
  gulp.watch('./src/**/*.js', js(browserSync))
}


gulp.task('serve',  gulp.series(build(), serve));
gulp.task('build', build())
gulp.task('clean', clean)
gulp.task('test', test)

