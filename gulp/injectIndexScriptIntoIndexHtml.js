import gulp from 'gulp'
import log from 'fancy-log'
import tap from 'gulp-tap'
import glob from 'glob'

function indexScriptInjector(fileData, indexScriptTag) {
  const regExp = /<!-- inject:index:js -->(.*?)<!-- endinject -->/s
  return fileData.replace(regExp, indexScriptTag)
}

function getIndexJsFilename(htmlPath) {
  const arrPath = htmlPath.split('/')
  arrPath.pop()
  const indexJsDistPath = glob.sync(arrPath.join('/') + '/index.**.js')

  if (!indexJsDistPath || indexJsDistPath.length !== 1) {
    log.error('Script injector problem fro file: ' + htmlPath)
    throw new Error()
  }

  const indexJsPathArr = indexJsDistPath[0].split('/')
  return indexJsPathArr[indexJsPathArr.length - 1]
}

function indexJsInjector() {
  return tap(function (file) {
    const isDev = process.env.NODE_ENV === 'development'
    const scriptName = isDev ? 'index.js' : getIndexJsFilename(file.path)
    const scriptTag = `<script src="${scriptName}"></script>`
    file.contents = Buffer.from(indexScriptInjector(file.contents.toString(), scriptTag))

    log.info(`Script: ${scriptName} has been injected into: ${file.path}`)
  })
}

export function injectIndexScript() {
  const task = gulp.src('dist/**/index.html').pipe(indexJsInjector()).pipe(gulp.dest('dist'))
  return task
}
