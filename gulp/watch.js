'use strict';

var gulp = require('gulp');

/**
 * Watches for ts files
 */
gulp.task('tsWatcher', false, function () {
  gulp.watch('**/*.ts', ['lint', 'compile']);
});

/**
 * Watches for non-ts files
 */
gulp.task('nonTsWatcher', false, function () {
  gulp.watch(['src/.env','src/**/*', '!src/**/*.ts'], ['copyNonTs']);
});

/**
 * Combined watcher
 */
gulp.task('watch', 'Master watch task, adds cumulative watches (test/lint)', ['tsWatcher', 'nonTsWatcher'], function () {
});