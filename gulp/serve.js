import gulp from 'gulp'
import { html } from './html'
import { sass } from './sass'
import { js } from './js'
import { initServer } from './initServer'
import { injectIndexScript } from './injectIndexScriptIntoIndexHtml'

export function serve() {
  const browserSync = require('browser-sync').create()
  initServer(browserSync)

  gulp.watch('src/**/*.html').on('change', gulp.series(html, injectIndexScript, browserSync.reload))

  gulp.watch('./src/**/*.scss', sass(browserSync))
  gulp.watch('./src/**/*.js', js(browserSync))
}
