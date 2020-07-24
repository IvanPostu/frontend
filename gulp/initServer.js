export default function(browserSync) {
  browserSync.init({
    open:false,
    server: {
      baseDir: "./dist"
    }
  });
}