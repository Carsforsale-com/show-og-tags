// Generated on 2019-06-04 using generator-bookmarklet 1.2.0
'use strict';

var buffer = require('buffer'),
    del = require('del'),
    gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpJshint = require('gulp-jshint'),
    gulpUglify = require('gulp-uglify'),
    jshintStylish = require('jshint-stylish'),
    map = require('map-stream');

gulp.task('scripts', function () {
  var header = new Buffer('// Copy this to your URL bar:\njavascript:');

  gulp.src('app/{,*/}*.js')
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter(jshintStylish))
    .pipe(gulpUglify())
    .pipe(gulpConcat('bookmarklet.js'))
    .pipe(map(function (file, cb) {
      file.contents = buffer.Buffer.concat([header, file.contents]);
      cb(null, file);
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('default', ['clean', 'scripts']);

gulp.task('watch', function () {
  gulp.watch('app/{,*/}*.js', ['scripts']);
});
