import gulp from 'gulp';
import imagemin from 'imagemin';
//
// import extReplace from 'gulp-ext-replace';
import gulpIf from 'gulp-if';
// const webp = require('imagemin-webp');
// const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const extReplace = require('gulp-ext-replace');
const isProd = process.env.NODE_ENV === 'prod';

export function images() {
    return gulp
        .src('dev/images/**/*')
        .pipe(
            gulpIf(
                isProd,
                imagemin([
                        'images/*.{jpg,png}',
                    ],
                    {
                        interlaced: true,
                        progressive: true,
                        optimizationLevel: 5,
                        svgoPlugins: [{ removeViewBox: true }],
                        // plugins: [
                        //     imageminWebp({quality: 50})
                        // ]
                    })
            )
        )
        .pipe(webp({quality: 50}))
        // .pipe(extReplace(".webp"))
        .pipe(gulp.dest('dist/images'));
}
export function fonts() {
    return gulp.src(['dev/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
}