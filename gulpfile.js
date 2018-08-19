var gulp = require('gulp');
var shell = require('gulp-shell');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var css = function() {
	// Compile LESS
	browserSync.notify('Compiling LESS and minifying CSS...');
	return gulp.src('assets/css/less/site.less')
		.pipe(less())
		.pipe(cleanCSS({
               compatibility: 'ie8'
          }))
		.pipe(rename({
            suffix: '.min'
        	}))
        	.pipe(gulp.dest('./assets/css'));
};

// Task for building blog when something changed:
var build = function(watch) {
     browserSync.notify('Running jekyll build...');
     exec('bundle exec jekyll build' + (watch ? ' --watch' : ''), function(err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
     });
};

gulp.task('css', function() {
	css();
});

gulp.task('build', function() {
     build(false);
});

// Task for serving blog with Browsersync
gulp.task('serve', function() {
     browserSync.init({
          port: 4000,
          server: {
               baseDir: '_site/'
          },
          reloadDebounce: 250
     });

     build(true);

     // Reloads page when some of the already built files changed:
     gulp.watch('_site/*.*').on('change', browserSync.reload);

	// Recompiles CSS if any LESS files change.
	gulp.watch('assets/css/less/*.*').on('change', css);
});

gulp.task('default', ['css', 'serve']);
