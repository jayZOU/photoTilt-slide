var gulp = require('gulp'),
  	connect = require('gulp-connect');
 
gulp.task('connectSrc', function () {
  connect.server({
    root: './',
    port: 8080,
  });
});

// gulp.task('scripts', function() {
//     // Single entry point to browserify 
//     gulp.src('./src/js/index.js')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : false
//         }))
//         .pipe(gulp.dest('./src/build/'))
// });
 
gulp.task('watch', ['connectSrc']);