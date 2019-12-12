let gulp = require("gulp")
let babel = require("gulp-babel")
let connect = require("gulp-connect")
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let cssmin = require("gulp-cssmin");
// let cssmin = require("cssmin");
let htmlmin = require("gulp-htmlmin");

gulp.task("qwe",()=>{
    console.log("这是gulp")
})

// 引入服务器插件
gulp.task("server",()=>{
    connect.server({
        root:"server",
        port:88,
        livereload:true
    })
})

// (合并，压缩，改名)
gulp.task("hyg",()=>{
    gulp.src("./server/javascript/*.js")
    .pipe(babel())
    // .pipe(concat("index.js"))   // 合并后改名
    // .pipe(uglify()) // 压缩
    .pipe(gulp.dest("server/qwe"))  // 转存
    // .pipe(rename("index.min.js"))
    // .pipe(gulp.dest("server/javascript"))
    // .pipe(connect.reload())
})

// sass转css
gulp.task("sass",()=>{
    gulp.src("./res/css/*.scss")
    .pipe(sass().on("error",sass.logError)) // 遇到错误不会停止，会打印错误信息
    .pipe(cssmin())
    .pipe(gulp.dest("server/css"))
})

// // 压缩css插件
// // 压缩html插件
// // removeComments: true,//清除HTML注释
// // {collapseWhitespace: true,//压缩HTML
// // collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
// // removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
// // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
// // removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
// // minifyJS: true,//压缩页面JS
// // minifyCSS: true//压缩页面CSS}

// 监听
gulp.task("jtsass",()=>{
    gulp.watch(("./res/css/*"),["sass"])
})
gulp.task("jthyg",()=>{
    gulp.watch(("./res/javascript/*"),["hyg"])
})
// // 定义批量执行命令
// gulp.task("pi",["server","hyg","jt"],()=>{    // 第二个参数是指令名
//     console.log("执行完成")
// })