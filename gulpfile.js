/**
 * Created by Wang Lei on 2016/11/30 0030.
 */
var del=require('del');
var gulp = require('gulp');
//压缩js文件
var uglify = require('gulp-uglify');
//压缩css
var mincss = require('gulp-minify-css');
//图片压缩
var minimage = require('gulp-imagemin');

//资源内联 （主要是js，css，图片）
var inline = require('gulp-inline-source');

//资源内联（主要是html片段）
var include = require('gulp-include');
//合并文件
var useref=require('gulp-useref');
//本地服务器
var connect=require('gulp-connect');
var gulpif = require('gulp-if');
var sequence=require('gulp-sequence');
//js代码校验
var jshint = require('gulp-jshint');
var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;

var spriter = require('gulp-css-spriter');


//清理构建目录
gulp.task('clean',function (cb) {
    del(['dist']).then(function () {
        cb()
    })
});

//js代码校验
gulp.task('jshint',function () {
    gulp.src('./src/js/*.js')
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('default'))
});

//压缩css
gulp.task('mincss',function () {
    return gulp.src('./src/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
});

//压缩js
gulp.task('minjs',function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

//图片压缩
gulp.task('minimages', function () {
    gulp.src('./src/images/*.{png,jpg,gif,ico}')
        .pipe(minimage())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('inlinehtml', function () {
    return gulp.src('./src/*.html')
        .pipe(inline())//把js内联到html中
        .pipe(include())//把html片段内联到html主文件中
        .pipe(useref())//根据标记的块  合并js或者css
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulpif('*.css',mincss()))
        .pipe(connect.reload()) //重新构建后自动刷新页面
        .pipe(gulp.dest('dist'));
});

//雪碧图合成
gulp.task('spriterCSS',function(){
    return gulp.src('./src/css/icon.css')
        .pipe(spriter({
            'spriteSheet': './dist/images/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
        }))
        .pipe(gulp.dest('./dist/css'));
});

//本地服务器  支持自动刷新页面
gulp.task('connect', function() {
    connect.server({
        root: './dist', //本地服务器的根目录路径
        port:8080,
        livereload: true
    });
});

//sequence的返回函数只能运行一次 所以这里用function cb方式使用
gulp.task('watchlist',function (cb) {
    sequence('clean',['mincss','minjs','inlinehtml'])(cb)
});

gulp.task('watch',function () {
    gulp.watch(['./src/**'],['watchlist']);
});


//中括号外面的是串行执行， 中括号里面的任务是并行执行。
gulp.task('default',function (cb) {
    sequence('clean',['spriterCSS','mincss','jshint','minjs','inlinehtml','minimages','connect'],'watch')(cb)
});

