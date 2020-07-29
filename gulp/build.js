import gulp from 'gulp'
import { clean } from './clean'
import { html } from './html'
import { sass } from './sass'
import { js } from './js'
import { test } from './test'
import { eslint } from './eslint'
import { injectIndexScript } from './injectIndexScriptIntoIndexHtml'
import { imagemin } from './assets'

export function build() {
  const isDev = process.env.NODE_ENV === 'development'
  const isProd = !isDev

  const seriesTasks = [
    clean,
    ...(isProd ? [gulp.parallel([test, eslint])] : []),
    gulp.parallel([html, sass(), js(), imagemin]),
    injectIndexScript
  ]

  return gulp.series(seriesTasks)
}
