// Config
var config = {
    dest: 'wwwroot/lib',
    src: {
        js: 'js/*.js',
        css: 'css/app.less'
    }
};

// Include gulp and plugins
var gulp = require('gulp');
var plug = {};
plug.jshint = require('gulp-jshint');
plug.concat = require('gulp-concat');
plug.uglify = require('gulp-uglify');
plug.clean = require('gulp-clean');
plug.less = require('gulp-less');
plug.mincss = require('gulp-minify-css')

// Lint JS
gulp.task('lint', function () {
    return gulp.src(config.src.js)
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('default'));
});

// Clean output dir
gulp.task('clean', function () {
    console.log('cleaning ' + config.dest);
    return gulp.src(config.dest)
        .pipe(plug.clean());
});

// Concatenate & minify JS
gulp.task('bundlejs', ['clean', 'lint'], function () {
    return gulp.src(config.src.js)
        .pipe(plug.concat('app.js', { newLine: ';' }))
        .pipe(plug.uglify())
        .pipe(gulp.dest(config.dest));
});

// Concatenate & minify Less
gulp.task('bundlecss', ['clean'], function () {
    return gulp.src(config.src.css)
        .pipe(plug.less())
        .pipe(plug.mincss())
        .pipe(gulp.dest(config.dest));
});

gulp.task('default', ['bundlejs', 'bundlecss']);
