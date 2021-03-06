const gulp = require('gulp');
const prettyError = require('gulp-prettyerror');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync');


  gulp.task("lint", function() {
    return (gulp 
      .src("./js/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError() )
        
    );
  });


  //babel task
  gulp.task(
    'scripts',
    gulp.series('lint', function() {
      return gulp
        .src('./js/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(
          rename({
            extname: '.min.js'
          })
        )
        .pipe(gulp.dest('./build/js'));
    })
  );

  
  gulp.task("sass", function() {
    return gulp
      .src("./sass/style.scss")
      .pipe(prettyError()) //new line added
      .pipe(sass())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("./build/css"))
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("./build/css"));
  });



gulp.task('scripts', gulp.series("lint", function(){
  return gulp
    .src("./js/*.js")
    .pipe( uglify() )
    .pipe( rename({ extname: ".min.js" }) )
    .pipe( gulp.dest( "./build/js"));
})
);

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

gulp
.watch(['build/**/*', '*.html'])
.on("change", browserSync.reload);

});

gulp.task("watch", function(){
  gulp.watch("js/*.js", gulp.series("scripts"));
  gulp.watch("sass/**/*.scss", gulp.series("sass"));

});

gulp.task("default", gulp.parallel("browser-sync", "watch"));


