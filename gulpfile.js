const gulp = require('gulp'),
  include = require('gulp-include'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  removelogging = require('gulp-remove-logging'),
  strip = require('gulp-strip-comments');

gulp.task('default', () => gulp.watch('./src/components/**/*.js', watchJs));


function watchJs(done) {
	gulp.src('./src/components/**/*.js', {dot: true, ignore: './src/components/**/_*.js'})
			.pipe(include()).on('error', console.log)
			.pipe(strip())
			.pipe(gulp.dest('./src/.'));

	done();
}

gulp.task('move', moveJs);

function moveJs(done) {
	gulp.src('./src/*.js', {dot: true, ignore: '/*.min.js'})
	  .pipe(removelogging())
    .pipe(strip())
	  .pipe(uglify())
		.pipe(rename(path => path.basename += '.min'))
	  .pipe(gulp.dest('./dist/'));

	// gulp.src('./src/js/*.min.js', {read: false})
	// 	.pipe(gulp.dest('./dist/js/'));
	done();
}