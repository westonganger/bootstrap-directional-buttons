var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    del = require('del');

var paths = {
  src: './src/*.scss',
  dist: './dist/'
};

gulp.task('default', ['compile']);

gulp.task('clean',function(cb){
  return del([
    paths.dist+"*"
  ], cb);
});

gulp.task('compile', ['clean'], function(cb){
  pump([
    gulp.src(paths.src), 
    
    sass({
      errLogToConsole: true
    }),

    autoprefixer({
      browsers: ['> 1%', 'last 3 versions', 'Firefox ESR'],
      cascade: false
    }),

    gulp.dest(paths.dist),

    rename({
      suffix: '.min'
    }),

    sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }),

    gulp.dest(paths.dist)
  ], cb);
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['compile']);
});
