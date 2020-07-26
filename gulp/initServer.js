export function initServer(browserSync) {
  browserSync.init({
    open: false,
    server: {
      baseDir: './dist'
    }
  })
}
