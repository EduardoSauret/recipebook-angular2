/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

var inject = require('gulp-inject');
 
gulp.src('./src/**/*.html')
  .pipe(inject(gulp.src('./src/**/*.js', {read: false}), {relative: true}))
  .pipe(gulp.dest('./src'));

  var bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream');
 
var cssFiles = gulp.src('./src/**/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./build'));
 
gulp.src('./src/index.html')
  .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
  .pipe(inject(es.merge(
    cssFiles,
    gulp.src('./src/app/**/*.js', {read: false})
  )))
  .pipe(gulp.dest('./build'));

  var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware 
  }
}));