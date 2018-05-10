let gulp        = require('gulp');
let concat      = require('gulp-concat');
let concatCss   = require('gulp-concat-css');
let sass        = require('gulp-sass');
let rename      = require('gulp-rename');
let uglify      = require('gulp-uglify');
let uglifycss   = require('gulp-uglifycss');
let gutil       = require('gulp-util');
let gulpWatch   = require('gulp-watch');
let watchSass   = require("gulp-watch-sass");
let runSequence = require('run-sequence');

let jsDestFolder      = './public/asset/js';
let cssDestFolder     = './public/asset/css';
let fontsDestFolder   = './public/asset/fonts';
let libaryPrefixPath  = './frontend/libary/';
let jsPrefixPath      = './frontend/js/';

gulp.task('lib-js', function() {
    return gulp.src([
            libaryPrefixPath + 'bootstrap-v4/js/bootstrap.bundle.min.js',
            libaryPrefixPath + 'bootstrap-v4/js/bootstrap.min.js',
        ])
        .pipe(concat('lib.js'))
        // .pipe(gulp.dest(jsDestFolder)) gulp make file lib.js (if new-bie want js of lib their can make this file) file is unnecessary because has file lib.min.js
        .pipe(rename('lib.min.js'))
        .pipe(uglify().on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })) // min files and throw Exception
        .pipe(gulp.dest(jsDestFolder));
});
gulp.task('lib-css', function() {
    return gulp.src([
            libaryPrefixPath + 'bootstrap-v4/css/bootstrap.min.css',
            libaryPrefixPath + 'bootstrap-v4/css/bootstrap-grid.min.css',
            libaryPrefixPath + 'bootstrap-v4/css/bootstrap-reboot.min.css',
        ])
        .pipe(concatCss('lib.css'))
        // .pipe(gulp.dest(cssDestFolder))  gulp make file lib.css (if new-bie want css of lib their can make this file) file is unnecessary because has file lib.min.css
        .pipe(rename('lib.min.css'))
        .pipe(uglifycss()) // min file
        .pipe(gulp.dest(cssDestFolder));
});

gulp.task('training-theme-js', function() {
    return gulp.src([
        ])
        .pipe(concat('training-theme.js'))
        .pipe(rename('training-theme.min.js'))
        .pipe(uglify().on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })) // min files and throw Exception
        .pipe(gulp.dest(jsDestFolder));
});

gulp.task('training-theme-css', function() {
    return gulp.src([
            './frontend/scss/style.scss',
        ])
        .pipe(sass())
        .pipe(concatCss('training-theme.css'))
        .pipe(rename('training-theme.min.css'))
        .pipe(uglifycss()) // min file
        .pipe(gulp.dest(cssDestFolder));
});

gulp.task('watch-style-css', function () {
    gulp.watch(['frontend/scss/style.scss'], ['compile-style-css']);
});

gulp.task('lib-img', function() {
    return gulp.src([
    ])
    .pipe(gulp.dest(imagesDestFolder))
})
gulp.task('lib-fonts', function() {
    return gulp.src([
    ])
    .pipe(gulp.dest(fontsDestFolder))
})

gulp.task('default', function(callback) {
    runSequence('lib-js', 'lib-css', 'lib-img', 'lib-fonts', callback);
});
