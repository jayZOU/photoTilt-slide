var gulp = require('gulp'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  watchify = require('watchify');

gulp.task('connectSrc', function() {
  connect.server({
    root: './src',
    port: 8080
  });
});

gulp.task('compress', function() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['compress']);
});

// gulp.task('lint', function() {
//   return gulp.src('./src/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });

// gulp.task('scripts', function() {
//     // Single entry point to browserify 
//     gulp.src('./src/js/index.js')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : false
//         }))
//         .pipe(gulp.dest('./src/build/'))
// });

gulp.task('dev', ['watch', 'connectSrc', 'compress']);