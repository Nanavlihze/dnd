var gulp = require('gulp');
var gulpTs= require('gulp-typescript');
var tsProject_client = gulpTs.createProject('./app/public/config/tsconfig.json');
var gulpSm = require('gulp-sourcemaps');
var gulpClean = require('gulp-clean');

var browserSync = require('browser-sync');

browserSync.init(null, {
    server: {
            baseDir: './'
        },
    
    files: ["app/public/**/*.*"],
    port: 3000,
});

gulp.task('compile_client_app', function(){  
    console.log('Compiling client application...');
    return gulp.src(['app/public/typescripts/**/*.ts'])
        .pipe(gulpSm.init())
        .pipe(tsProject_client())
        .pipe(gulpSm.write('./'))
        .pipe(gulp.dest('app/public/typescripts/'));    
})

gulp.task('browser_sync', ['compile_client_app'], function(){
    browserSync.reload();
});

gulp.task('watch_client', ['compile_client_app'], function(){
    return gulp.watch(['app/public/typescripts/**/*.ts'], ['browser_sync']);
});

gulp.task('watch_client_html', function(){  
    return gulp.watch(['app/public/**/*.html'], ['browser_sync']);
});

gulp.task('default', ['watch_client', 'watch_client_html'], function() {
    console.log("Watching all...");
});