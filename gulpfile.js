var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var jshint = require('gulp-jshint'); // Debug JS files
var stylish = require('jshint-stylish'); // More stylish debugging
var concat = require('gulp-concat'); // Join all JS files together to save space
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var uglify = require('gulp-uglify'); // Minify JavaScript

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], function() {
  browserSync({
    notify: true,
    open: false,
    server: {
      baseDir: '_site'
    }
  });
});

/**
* Compile files both for live injecting and site (for future jekyll builds)
*/
gulp.task('sass', function () {
  return gulp.src('_app/sass/main.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/source'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('source'));
});

// Task to run JS hint
gulp.task('jshint', function() {
  gulp.src([
    '_app/scripts/head/mediaelement-and-player.js',
    '_app/scripts/head/mep-feature-playlist.js',
    '_app/scripts/head/vimeo-api.js',
    '_app/scripts/head/head.js',
    '_app/scripts/body/barba.js',
    // '_app/scripts/body/lity.js',
    // '_app/scripts/body/audioplayer.js',
    // '_app/scripts/body/audioswitcher.js',
    // '_app/scripts/body/contentswitch.js',
    '_app/scripts/body/portfolio.js',
    '_app/scripts/body/equalizer.js',
    '_app/scripts/body/body.js'
    // '_app/scripts/body/audiooverlap.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

// Task to concat, strip debugging and minify JS files
gulp.task('scripts', function() {
  gulp.src([
    // Head
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/moveto/dist/moveTo.min.js',
    // '_app/scripts/head/vimeo-api.js',
    // 'node_modules/@vimeo/player/dist/player.min.js',
    // 'node_modules/fluidvids.js/dist/fluidvids.js',
    // '_app/scripts/head/mep-feature-playlist.js',
    // 'node_modules/mediaelement/build/mediaelement-and-player.min.js',
    '_app/scripts/head/mediaelement-and-player.js',
    '_app/scripts/head/mep-feature-playlist.js',
    '_app/scripts/head/vimeo-api.js',
    '_app/scripts/head/head.js'
  ])
  .pipe(concat('head.js'))
  .pipe(stripDebug())
  .pipe(gulp.dest('_site/source'))
  .pipe(uglify())
  .pipe(gulp.dest('source'));
  browserSync.reload();
  gulp.src([
    // Body
    'node_modules/barba.js/dist/barba.min.js',
    '_app/scripts/body/barba.js',
    'node_modules/gsap/src/minified/TweenMax.min.js',
    // '_app/scripts/body/jquery.fitvids.js',
    // 'node_modules/mediaelement/build/mediaelement-and-player.min.js',
    '_app/scripts/body/lity.js',
    // '_app/scripts/body/audioplayer.js',
    // '_app/scripts/body/audioswitcher.js',
    // '_app/scripts/body/contentswitch.js',
    'node_modules/tabslet/jquery.tabslet.min.js',
    '_app/scripts/body/portfolio.js',
    '_app/scripts/body/equalizer.js',
    '_app/scripts/body/body.js'
    // '_app/scripts/body/tabslet.js'
    // '_app/scripts/body/audiooverlap.js'
  ])
  .pipe(concat('body.js'))
  .pipe(stripDebug())
  .pipe(gulp.dest('_site/source'))
  .pipe(uglify())
  .pipe(gulp.dest('source'));
  browserSync.reload();
});

/**
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
  gulp.watch('_app/sass/**/*.scss', ['sass']);
  gulp.watch(['_app/scripts/*/*.js', '!_app/scripts/*/*.backup*.js'], ['scripts', 'jshint']);
  gulp.watch(['pages/*', '_layouts/*.html', '_includes/*.html', '_music/*', '_videos/*', '_posts/*'], ['jekyll-rebuild']);
});

/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);
