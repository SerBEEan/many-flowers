const { src, dest, series, parallel, watch } = require('gulp');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const rename        = require('gulp-rename');
const sass          = require('gulp-sass');
const cleanCss      = require('gulp-clean-css');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const imageMin      = require('gulp-imagemin');
const newer         = require('gulp-newer');
const browserSync   = require('browser-sync').create();

//TODO: Убрать sourcemaps после завершения разработки

function browsersync () {
    browserSync.init({
        server: { baseDir: './' },
        //notify: false,                  //Уведомление
        online: true                     //Работа в онлайн сети
    });

    watch('./src/js/**/*.js', scripts);
    watch('./src/scss/**/*.scss', styles);
    watch('./index.html').on('change', browserSync.reload);
    watch('./src/images/**/*', imagemin);
    watch('./src/fonts/**/*', fonts);
}

function scripts () {
    return src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('./dest'))
        .pipe(browserSync.stream());
}

function styles () {
    return src('./src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(concat('style.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleanCss())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(dest('./dest'))
        .pipe(browserSync.stream());
}

function fonts () {
    src('./src/fonts/**/*.css')
        .pipe(dest('./dest/fonts'));

    return src('./src/fonts/**/*.{otf,ttf,woff,woff2,eot}')
        .pipe(newer('./dest/fonts'))
        .pipe(dest('./dest/fonts'))
        .pipe(browserSync.stream());
}

function imagemin () {
    return src('./src/images/**/*')
        .pipe(newer('./dest/images'))
        .pipe(imageMin())
        .pipe(dest('./dest/images'));
}

exports.scripts     = scripts;
exports.styles      = styles;
exports.imagemin    = imagemin;

exports.finishBuild = series(styles, fonts, scripts, imagemin);

exports.default     = parallel(styles, fonts, scripts, browsersync);
