var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
// For serving
var child = require('child_process');
var fs = require('fs');

// External dependencies
var dependencies = [
  'react',
  'react-dom'
]

// Count of times task fires
var scriptsCount = 0;

// Tasks
// -----
gulp.task('scripts', () => {
  bundleApp(false);
});

gulp.task('deploy', () => {
  bundleApp(true);
});

gulp.task('watch', () => {
  gulp.watch(['./src/*.js'],['scripts']);
});

gulp.task('server', () => {
  var server = child.spawn('node',['app']);

  var log = fs.createWriteStream('server.log',{flags: 'a'});
  server.stdout.pipe(log);
  server.stderr.pipe(log);
});

// Default Task
gulp.task('default',['scripts','server','watch']);

// Private fxns
// ------------
function bundleApp(isProduction) {
  scriptsCount++;

  var appBundler = browserify({
    entries: ['./src/app.js']
  });

  if (!isProduction) {

    if (scriptsCount === 1) {
      var dependenciesBundle = browserify({
        require: dependencies,
        debug: true
      })

      dependenciesBundle
      .bundle()
      .on('error',gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./static/'))
    }

    dependencies.forEach((dep) => appBundler.external(dep));
  }

  appBundler
    .transform('babelify',{presets: ['es2015','react']})
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./static/'))
}
