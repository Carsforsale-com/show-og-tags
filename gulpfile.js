'use strict';

var del = require('del'),
  gulp = require('gulp'),
  gulpConcat = require('gulp-concat'),
  gulpJshint = require('gulp-jshint'),
  minify = require('gulp-babel-minify'),
  jshintStylish = require('jshint-stylish');

gulp.task('scripts', ['clean'], function () {
  return gulp.src('app/{,*/}*.js')
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter(jshintStylish))
    .pipe(minify())
    .pipe(gulpConcat('bookmarklet.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmls', ['clean'], function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('default', ['clean', 'scripts', 'htmls']);

gulp.task('watch', function () {
  gulp.watch('app/{,*/}*.js', ['scripts']);
});
