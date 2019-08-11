let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
// // let pipeline = require('readable-stream').pipeline
// let concat = require('gulp-concat')
// let uglify = require('gulp-uglify')
// let rename = require('gulp-rename')
// let less = require('gulp-less')
// let cleanCss = require('gulp-clean-css')
// let htmlMin = require('gulp-htmlmin')
// // let livereload = require('gulp-livereload')
// let connect = require('gulp-connect')
let open = require('open')
/**1、合并压缩js
 * 2、预编译转css，css合并压缩
 * 3、html压缩
 * 4、livereload
 * 5、全自动化
 */

gulp.task('js', function () {
  /**
   * readable-stream的pipeline写法示例
   */
  // return pipeline(
  //   gulp.src('./src/js/**/*.js'), //找到目标源文件
  //   concat('build.js'),
  //   gulp.dest('dist/js/'),
  //   uglify(),
  //   rename({suffix: '.min'}),
  //   gulp.dest('dist/js/')
  // )
  return gulp.src('src/js/**/*.js') //找到目标源文件
    .pipe($.concat('build.js')) //临时合并文件
    .pipe(gulp.dest('dist/js/')) //临时输出文件到本地
    .pipe($.uglify())//压缩文件
    .pipe($.rename({suffix: '.min'}))//重命名文件
    .pipe(gulp.dest('dist/js/'))//输出压缩文件
    .pipe($.connect.reload())
})

gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe($.less()) //编译less文件为css文件
    .pipe(gulp.dest('src/css/'))
    .pipe($.connect.reload())
})

gulp.task('css', gulp.series('less', function () {
  return gulp.src('src/css/*.css')
    .pipe($.concat('build.css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe($.connect.reload())
}))

gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
    .pipe($.connect.reload())
})

/**注册默认任务
 * 不要用Gulp3的方式指定依赖任务，你需要使用gulp.series和gulp.parallel，因为gulp任务现在只有两个参数。
 * gulp.series：按照顺序执行
 * gulp.parallel：可以并行计算
 */
gulp.task('default', gulp.series(gulp.parallel('js', 'css', 'html')))

/**
 * 注册监听任务(半自动)
 */
gulp.task('watch', gulp.series(gulp.parallel('default'), function () {
  //开启监听
  // livereload.listen()
  //确认监听的目标以及绑定的相应任务
  // gulp.watch(['src/js/**/*.js', 'src/css/*.css'],['js', 'css'])//gulp3.x使用方式

  let watcher = gulp.watch(['src/js/**/*.js', 'src/css/*.css', 'index.html']);/* 你也可以在这儿传入一些选项与/或一个任务函数 */
  watcher.on('all', gulp.parallel('js', 'css', 'html'))
}))

/**
 * 注册监听任务（全自动）
 */
gulp.task('server', gulp.series(gulp.parallel('default'), function () {
  $.connect.server({
    root: 'dist/',
    livereload: true,
    port: 5000
  })

  open('http://localhost:5000/')
  let watcher = gulp.watch(['src/js/**/*.js', 'src/css/*.css', 'index.html']);/* 你也可以在这儿传入一些选项与/或一个任务函数 */
  watcher.on('all', gulp.parallel('js', 'css', 'html'))
}))