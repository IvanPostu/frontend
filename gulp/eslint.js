import gulp from 'gulp'
import gulpIf from 'gulp-if'
import gulpEslint from 'gulp-eslint'
import log from 'fancy-log'

function isFixed(file) {
  const isFixed = file.eslint != null && file.eslint.fixed
  return isFixed
}

export function eslint() {
  const throwOnWarn = process.env.ESLINT_THROW_ON_WARN === 'true'

  const result = gulp
    .src(['**/*.js', '!node_modules{,/**}'])
    .pipe(gulpEslint({ fix: true, configFile: '.eslintrc' }))
    .pipe(gulpEslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')))
    .pipe(
      gulpEslint.results((results) => {
        log(`Total Results: ${results.length}`)
        log(`Total Warnings: ${results.warningCount}`)
        log(`Total Errors: ${results.errorCount}`)

        if (results.errorCount > 0) {
          throw new Error('Error count is greater than 0')
        }

        if (results.warningCount > 0 && throwOnWarn) {
          throw new Error('Warning count is greater than 0')
        }
      })
    )

  return result
}
