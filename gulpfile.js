const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('./app/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
	return gulp.src([
			'./app/css/fonts.css',
			'./app/css/normalize.css',
			'./app/css/owl.carousel.css',
			'./app/css/style.css'
	])
		.pipe(csso())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
			'./app/js/libs/jquery/*.js',
			'./app/js/libs/owl/*.js',
			'./app/js/index.js',
			'./app/js/validate.js'
		])
		.pipe(concat('index.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function() {
	return gulp.src([
		'./app/img/*.png',
		'./app/img/**/*.jpg'
	])
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'))
});

gulp.task('watcher', ['browser-sync', 'css', 'scripts'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/css/style.css', ['css']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/index.js', ['scripts'])
});

gulp.task('default', ['watcher']);

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'sass', 'css', 'scripts'], function() {
	const buildCSS = gulp.src('app/css/style.min.css')
	.pipe(gulp.dest('dist/css'))

	const buildJS = gulp.src('app/js/index.min.js')
	.pipe(gulp.dest('dist/js'))

	const buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	const buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))

	const buildPHP = gulp.src('app/*.php')
	.pipe(gulp.dest('dist'))
});
