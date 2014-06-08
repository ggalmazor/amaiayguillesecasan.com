var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var Q = require('q');

var paths = {
  build: {
    libs: './libs/',
    fonts: './fonts/',
    css: './css/'
  },
  bower: './bower_components/'
};

gulp.task('watch', function () {
  'use strict';
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('connect', function () {
  'use strict';
  connect.server({
    port: 8081
  });
});

gulp.task('default', ['connect', 'watch']);

gulp.task('libs', function () {
  'use strict';
  var libs = [
    'angular/angular.min.js',
    'angular/angular.js',
    'angular-route/angular-route.js',
    'angular-route/angular-route.min.js',
    'angular-leaflet-directive/dist/angular-leaflet-directive.js',
    'angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
    'leaflet-dist/leaflet.js',
    'leaflet-dist/leaflet-src.js'
  ];

  return gulp.src(paths.build.libs)
    .pipe(clean())
    .on('end', function (done) {
      var defers = [];
      libs.forEach(function (lib) {
        var defer = Q.defer();
        gulp.src(paths.bower + lib)
          .pipe(gulp.dest(paths.build.libs))
          .on('end', defer.resolve);
        defers.push(defer);
      });
      return Q.all(defers, done);
    });
});

gulp.task('css', function () {
  'use strict';

  return gulp.src(paths.bower + 'bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest(paths.build.css));
});

gulp.task('fonts', function () {
  'use strict';
  return gulp.src(paths.build.fonts).pipe(clean()).on('end', function () {
    return gulp.src(paths.bower + 'bootstrap/dist/fonts/*').pipe(gulp.dest(paths.build.fonts));
  });
});

gulp.task('build', ['libs', 'css', 'fonts']);