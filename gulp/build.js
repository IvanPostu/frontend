import gulp from 'gulp'
import { clean } from './clean';
import { html } from './html';
import { sass } from './sass';
import { js } from './js'
import { test } from './test'

export function build(){

  const isDev = process.env.NODE_ENV === 'development'
  const isProd = !isDev

  const seriesTasks = [
    ...(isProd ? [clean, test] : []), 
    gulp.parallel([html, sass(), js()])
  ]

  return gulp.series(seriesTasks)

}
