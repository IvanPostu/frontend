import gulp from 'gulp';
import dotenv from 'dotenv'

import { fgcyan, reset } from './gulp/colors'
import { clean } from './gulp/clean'
import { html } from './gulp/html'
import { sass } from './gulp/sass'
import initServer from './gulp/initServer'
import { rebuild } from './gulp/rebuild';

const browserSync = require('browser-sync').create();
const dotenvConfig = dotenv.config()


if (dotenvConfig.error) {
  throw dotenvConfig.error
}
 
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

if(!isDev && !isProd){
  throw Error()
}

console.info(fgcyan, `
  Application is running in ${isDev ? 'DEBUG' : 'PRODUCTION'} mode,
  to change mode you need to change NODE_ENV value in .env file.
`, reset);


function serve(){
  initServer(browserSync)
  
  gulp.watch('src/**/*.html').on('change', 
    gulp.series(html, browserSync.reload)
  );
  
  gulp.watch("./src/**/*.scss", sass(browserSync));
}

gulp.task('serve',  gulp.series(rebuild(), serve));
gulp.task('rebuild', rebuild())
gulp.task('html', html)
gulp.task('clean', clean)

