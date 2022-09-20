const { src, dest, task, watch } = require('gulp');
const include = require('gulp-include');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const removelogging = require('gulp-remove-logging');
const strip = require('gulp-strip-comments');

task('default', () => watch('./src/components/**/*.js', watchJs));

function watchJs(cb) {
  src('./src/components/**/*.js', { dot: true, ignore: './src/components/**/_*.js' })
    .pipe(include()).on('error', console.log)
    .pipe(strip())
    .pipe(dest('./src/.'));

  cb();
}

task('move', moveJs);

function moveJs(cb) {
  src('./src/*.js', { dot: true, ignore: '/*.min.js' })
    .pipe(removelogging())
    .pipe(strip())
    .pipe(uglify())
    .pipe(rename(path => path.basename += '.min'))
    .pipe(dest('./dist/'));

  // src('./src/js/*.min.js', {read: false})
  // 	.pipe(dest('./dist/js/'));
  cb();
}