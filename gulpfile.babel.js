require('./gulp/dotenvFileResolver').resolve()
import gulp from 'gulp'
import { clean } from './gulp/clean'
import { test } from './gulp/test'
import { build } from './gulp/build'
import { eslint } from './gulp/eslint'
import { serve } from './gulp/serve'

gulp.task('serve', gulp.series(build(), serve))
gulp.task('build', build())
gulp.task('clean', clean)
gulp.task('test', test)
gulp.task('eslint', eslint)
