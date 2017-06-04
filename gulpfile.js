/**
 * Created by lijialin
 * start:gulp server
 * build:gulp build
 */
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const jslint = require('gulp-jslint')
const clean = require('gulp-clean')
const del = require('del')
const runSequence = require('gulp-run-sequence')
const reload = browserSync.reload

const port = 8000
const srcPath = './src'
const buildPath = './dist'

//启动服务器，也是gulp入口任务
gulp.task('server', () => {
  browserSync.init({
    server: './',
    port: port
  })
  gulp.watch('./example/**/*.html').on("change", reload)
  gulp.watch('./src/**/*.js').on("change", reload)
})

gulp.task('clean', () => {
  del.sync(buildPath + "/**/*")
})

gulp.task('copyJs', () => {
  return gulp.src(srcPath + '/js/**/*.js')
    .pipe(jslint())
    .pipe(jslint.reporter( 'my-reporter' ))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath))
})

gulp.task('build', () => {
  runSequence('clean', 'copyJs')
})
