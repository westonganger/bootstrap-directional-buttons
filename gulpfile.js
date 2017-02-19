var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    del = require('del');

var paths = {
  src: './src/*.less',
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
    
    less(),

    autoprefixer({
      browsers: ['> 1%', 'last 3 versions', 'Firefox ESR'],
      cascade: false
    }),

    gulp.dest(paths.dist),

    rename({
      suffix: '.min'
    }),

    gulp.dest(paths.dist)
  ], cb);
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['compile']);
});
