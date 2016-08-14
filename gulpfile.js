var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    script: 'server/index.js',
    watch: 'server',
    ext: 'js html hbs',
    env: { 'NODE_ENV': 'development' }
  })
})