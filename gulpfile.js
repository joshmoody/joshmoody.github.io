var gulp = require('gulp');
var shell = require('gulp-shell');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var notify = require('gulp-notify');
//var watch = require('gulp-watch')

var messages = {
     jekyll: '<span style="color: grey">Running:</span> Jekyll build',
     less: '<span style="color: grey">Running:</span> less'
};

// Task for building blog when something changed:
var build = function(watch) {
     browserSync.notify(messages.jekyll);
     exec('bundle exec jekyll build' + (watch ? ' --watch' : ''), function(err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
     });
};

// Compiles LESS > CSS
gulp.task('build-less', function() {
     browserSync.notify(messages.less);
     return gulp.src('./assets/css/less/site.less')
          .pipe(less())
          .pipe(gulp.dest('./assets/css'));
});

var buildLess = function() {
	gulp.start('build-less');
}

gulp.task('build', function() {
     buildLess();
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

	gulp.watch('assets/css/less/*.*').on('change', buildLess);
});

gulp.task('default', ['serve']);
