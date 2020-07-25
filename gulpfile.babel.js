import gulp from 'gulp';
import dotenv from 'dotenv'
import log from 'fancy-log'

import { fgcyan, fgwhite, bgyellow, reset } from './gulp/colors'
import { clean } from './gulp/clean'
import { html } from './gulp/html'
import { sass } from './gulp/sass'
import { js } from './gulp/js'
import { initServer } from './gulp/initServer'
import { rebuild } from './gulp/rebuild'

const browserSync = require('browser-sync').create();
const dotenvConfig = dotenv.config()

if (dotenvConfig.error) {
  throw dotenvConfig.error
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

if(!isDev && !isProd){
  throw Error('process.env.NODE_ENV is undefined or not valid.')
}

log(fgcyan, `Application is running in `+
  `${bgyellow+fgwhite}${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}${reset+fgcyan} mode, `+
  `to change mode you need to change NODE_ENV value in .env file.`, reset
);

function serve(){
  initServer(browserSync)
  
  gulp.watch('src/**/*.html').on('change', 
    gulp.series(html, browserSync.reload)
  );
  
  gulp.watch("./src/**/*.scss", sass(isDev, browserSync));

  gulp.watch('./src/**/*.js', js(isDev, browserSync))
}

const rebuildTask = rebuild(isDev)

gulp.task('serve',  gulp.series(rebuildTask, serve));
gulp.task('rebuild', rebuildTask)
gulp.task('clean', clean)

