var gulp                = require('gulp'),
    sass                = require('gulp-sass'),
    cleanCSS            = require('gulp-clean-css'),
    autoprefixer        = require('gulp-autoprefixer'),
    rename              = require('gulp-rename'),
    uglify              = require('gulp-uglify'),
    concat              = require('gulp-concat'),
    plumber             = require('gulp-plumber'),
    clean               = require('gulp-clean'),
    sourcemaps          = require('gulp-sourcemaps'),
    htmlmin             = require('gulp-htmlmin'),
    imagemin            = require('gulp-imagemin'),
    browserSync         = require('browser-sync');

var src                 = './src/',
    dist                = './dist/';

//HTML MINIFY
gulp.task('html', function(){
    return gulp.src(src + '*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

//SASS MINIFY
gulp.task('styles', function(){
    return gulp.src(src + 'assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass()
                .on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(rename({ basename: 'style'}))
            .pipe(cleanCSS())
            .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'assets/css'))
        .pipe(browserSync.stream());
});

//Javascript MINIFY
gulp.task('js', function(){
    return gulp.src(src + 'assets/js/*.js')
        .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'assets/js'))
        .pipe(browserSync.stream());
});

//Image compress
gulp.task('images', function(){
    return gulp.src(src + 'assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(dist + 'assets/images'));
});

//WATCH
gulp.task('default', function(){

    browserSync.init({
        server: './dist'
    });

    gulp.watch([src + '*.html'], gulp.series('html'));
    gulp.watch([src + 'assets/sass/**/*.scss'], gulp.series('styles'));
    gulp.watch([src + 'assets/js/*.js'], gulp.series('js'));
    gulp.watch([src + 'assets/images/*'], gulp.series('images'));
});
