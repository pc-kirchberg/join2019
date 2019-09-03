const { series, parallel, src, dest, watch } = require('gulp');
const gulpSass = require("gulp-sass");
const child_process = require("child_process");

function sass(cb) {
    return src("assets/styles/site.scss")
        .pipe(gulpSass().on("error", gulpSass.logError))
        .pipe(dest("assets/styles/"));
}

function watchSass() {
    return watch("assets/styles/site.scss", sass);
}

function eleventy() {
    return child_process.spawn("node_modules/.bin/eleventy", { stdio: "inherit" });
}

function watchEleventy() {
    return child_process.spawn("node_modules/.bin/eleventy", ["--serve"], { stdio: "inherit" });
}


exports.eleventy = eleventy;
exports.dev = parallel(watchSass, watchEleventy);
exports.default = series(sass, eleventy);
