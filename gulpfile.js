/*jshint node: true */

'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    config = require('./gulp.config')(),
    del = require('del'),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less) //Less file to compile
        .pipe($.plumber()) //Handle compile errors
        .pipe($.less()) //Compile to CSS
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']})) //Add vendor prefixes
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function (done) { //Use a callback function since this function doesn't use streams
    clean(config.temp + '**/*.css', done);
});

gulp.task('less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});

/////////////

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
