var gulp = require('gulp');
var child = require('child_process');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var useref = require('gulp-useref');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var gulpif = require ('gulp-if');

// COMPILE SASS
gulp.task('sass', function(){
  gulp.src(['source/sass/**/*.scss'])
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }
  }))
  .pipe(sass())
  .pipe(autoPrefixer())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('local/assets'))
  .pipe(browserSync.reload({stream:true}))
});

// MINIFY AND COPY SASS
gulp.task('dist-sass', function(){
  gulp.src(['local/assets/**/*.css'])
  .pipe(cleanCss())
  .pipe(gulp.dest('assets'))
});

// RETURN JAVASCRIPT ERRORS
gulp.task('js-hint', function() {
  gulp.src([
    'source/scripts/**/*.js',
    '!source/scripts/backup'
  ])
  .pipe(plumber({
    handleError: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});

// COMPILE JAVASCRIPT
gulp.task('js', function() {
  return gulp.src('source/scripts/conc.html')
    .pipe(useref())
    .pipe(gulp.dest('local/assets'))
});

// COPY AND MINIFY JAVASCRIPT
gulp.task('dist-js', function() {
  gulp.src('local/assets/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('assets'))
});

// BUILD JEKYLL
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build', '--watch', '--incremental', '--drafts']);
  const jekyllLogger = (buffer) => {
    buffer.toString()
    .split(/\n/)
    .forEach((message) => gutil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
  browserSync.reload;
});

// COPY LEFT-OVER DATA TO LOCAL
gulp.task('copy', function() {
  gulp.src('source/assets/*')
  .pipe(gulp.dest('local/assets'))
});

// COPY LEFT-OVER DATA TO ASSETS
gulp.task('dist-copy', function() {
  gulp.src('source/assets/*')
  .pipe(gulp.dest('assets'))
});

// SERVE AND WATCH
gulp.task('serve', function(){
  browserSync.init({
    notify: false,
    open: false,
    server: "./local"
  });
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch(['source/scripts/**/*.js', '!source/scripts/backup', 'source/scripts/conc.html'], ['js', 'js-hint']);
  // gulp.watch(['**/*.markdown', '**/*.md', '**/*.yml', '**/*.html', '!local/*.html'], ['jekyll']);
  gulp.watch(['./*.{markdown,md}', '{_includes,_layouts}/**/*.html'], ['jekyll']);
  gulp.watch('source/assets/*', ['copy']);
  gulp.watch(['local/*.html', 'local/assets/**/*.js']).on('change', browserSync.reload);
  // gulp.watch('local/assets/**/*.js').on('change', browserSync.reload);
});

// CREATE LOCAL BUILD
gulp.task('default', function(callback) {
  runSequence(
    // ['jekyll', 'sass', 'js', 'copy'],
    // 'serve',
    // callback
    ['sass', 'js', 'copy'],
    'jekyll',
    'serve',
    callback
  );
});

// BUILD LOCAL DIRECTORY
gulp.task('build', function(callback) {
  runSequence(
    ['sass', 'js', 'copy'],
    ['dist-sass', 'dist-js', 'dist-copy'],
    callback
  );
});
