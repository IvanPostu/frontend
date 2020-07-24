import gulp from 'gulp'
import { clean } from './clean';
import { html } from './html';
import { sass } from './sass';

export function rebuild(isDev){
  return gulp.series(clean, gulp.parallel(html, sass(isDev)))
}