/// <binding />
// Config
var root = 'wwwroot';
var dest = root + '/lib';

// Include gulp and plugins
var gulp = require('gulp');
var plug = {};
plug.jshint = require('gulp-jshint');
plug.concat = require('gulp-concat');
plug.uglify = require('gulp-uglify');
plug.clean = require('gulp-clean');
plug.less = require('gulp-less');
plug.mincss = require('gulp-minify-css')

// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('default'));
});

gulp.task('clean', function () {
    console.log('cleaning ' + dest);
    return gulp.src(dest)
        .pipe(plug.clean());
});

// Concatenate & Minify JS
gulp.task('bundlejs', ['clean', 'lint'], function () {
    return gulp.src('js/*.js')
        .pipe(plug.concat('app.js', { newLine: ';' }))
        .pipe(plug.uglify())
        .pipe(gulp.dest(dest));
});

// Concatenate & minify Less
gulp.task('bundlecss', ['clean'], function () {
    return gulp.src('css/App.less')
        .pipe(plug.less())
        .pipe(plug.mincss())
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['bundlejs', 'bundlecss']);
