import gulp from 'gulp'
import ava from 'gulp-ava'

export function test() {
  return gulp.src('./src/**/.test.js').pipe(ava({ verbose: true }))
}
