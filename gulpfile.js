'use strict';

let project_folder = "dist";
let source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        libs: project_folder + "/libs/",
    },
    src: {
        html: [source_folder + "/views/*.html", source_folder + "/views/pages/*.html", "!" + source_folder + "/views/_*.html"],
        css: [source_folder + "/styles/style.scss", "!" + source_folder + "/blocks/modules/**/*.scss"],
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        libs: source_folder + "/libs/**/*",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        libs: source_folder + "/libs/**/*",
    },
    clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
    gulp         = require('gulp'),
    browsersync  = require('browser-sync').create(),
    fileinclude  = require('gulp-file-include'),
    del          = require('del'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media  = require('gulp-group-css-media-queries'),
    clean_css    = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify-es').default,
    imagemin     = require('gulp-imagemin'),
    webp         = require('gulp-webp'),
    webphtml     = require('gulp-webp-html'),
    htmlmin      = require('gulp-htmlmin');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        /* .pipe(webphtml()) */
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        /* .pipe(
            webp({
                quality: 70
            })
        ) */
        //.pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        /* .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interPlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        ) */
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function libs() {
    return src(path.src.libs)
        .pipe(dest(path.build.libs));
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.libs], libs);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, libs));
let watch = gulp.parallel(build, browserSync, watchFiles);


exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.libs = libs;
exports.build = build;
exports.watch = watch;
exports.default = watch;