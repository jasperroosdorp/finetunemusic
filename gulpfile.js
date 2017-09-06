// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

// load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"],
  rename: {
    'browser-sync': 'browserSync',
    'gulp-jshint': 'gjshint',
    'gulp-strip-debug': 'stripDebug',
    'gulp-extname': 'extname',
    'gulp-minify': 'minify'
  }
});



// JEKYLL

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll', function (done) {
  $.browserSync.notify(messages.jekyllBuild);
  return $.child_process.spawn( jekyll , ['build'], {stdio: 'inherit'})
  // return $.child_process.spawn( jekyll , ['build', '--config=_config.yml,_config.dev.yml'], {stdio: 'inherit'})
  .on('close', done);
});

gulp.task('jekyll-serve', ['jekyll'], function () {
  $.browserSync.reload();
});



// SASS

gulp.task('sass', function () {
  return gulp.src('_app/sass/main.min.scss')
  .pipe($.sass({
    includePaths: ['scss'],
    onError: $.browserSync.notify
  }))
  .pipe($.autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/source'))
  .pipe($.browserSync.reload({stream:true}))
  .pipe(gulp.dest('source'));
});

gulp.task('sass-compress', function () {
  return gulp.src('_app/sass/main.min.scss')
  .pipe($.sass({
    includePaths: ['scss'],
    outputStyle: 'compressed'
  }))
  .pipe($.autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/source'))
  .pipe(gulp.dest('source'));
});



// SCRIPTS

gulp.task('scripts', function() {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/cloudinary-core/cloudinary-core-shrinkwrap.min.js',
    'node_modules/moveto/dist/moveTo.min.js',
    '_app/scripts/head/mediaelement-and-player.js',
    '_app/scripts/head/mep-feature-playlist.js',
    '_app/scripts/head/head.js'
  ])
  .pipe($.concat('head.js'))
  .pipe($.stripDebug())
  .pipe($.extname('.min.js'))
  .pipe(gulp.dest('source'))
  $.browserSync.reload();
  gulp.src([
    'node_modules/barba.js/dist/barba.min.js',
    '_app/scripts/body/barba.js',
    'node_modules/gsap/src/minified/TweenMax.min.js',
    'node_modules/fluidvids.js/dist/fluidvids.min.js',
    '_app/scripts/body/portfolio.js',
    '_app/scripts/body/equalizer.js',
    '_app/scripts/body/body.js'
  ])
  .pipe($.concat('body.js'))
  .pipe($.stripDebug())
  .pipe($.extname('.min.js'))
  .pipe(gulp.dest('source'))
  $.browserSync.reload();
});

gulp.task('scripts-hint', function() {
  gulp.src([
    '_app/scripts/head/*.js',
    '_app/scripts/body/*.js'
  ])
  .pipe($.gjshint())
  .pipe($.gjshint.reporter('jshint-stylish'));
});

gulp.task('scripts-compress', function() {
  gulp.src(['source/*.min.js'])
  .pipe($.minify({
    ext:{
      src:'-debug.js',
      min:'.js'
    },
  }))
  .pipe(gulp.dest('source'))
});



// SERVE

gulp.task('browser-sync', function() {
  $.browserSync({
    notify: true,
    open: true,
    reloadOnRestart: true,
    server: {
      baseDir: '_site'
    }
  });
});



// COMBOS

gulp.task('watch', function () {
  gulp.watch(['_app/sass/**/*.scss'], ['sass']);
  gulp.watch(['_app/scripts/head/*.js', '_app/scripts/body/*.js'], ['scripts', 'scripts-hint']);
  gulp.watch(['pages/*', '_layouts/*.html', '_includes/*.html', '_music/*', '_videos/*', '_posts/*', 'source/*.min.js'], ['jekyll-serve']);
});

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('compress', ['scripts-compress', 'sass-compress']);
