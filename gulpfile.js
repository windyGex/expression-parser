var gulp = require('gulp');
var browserify = require('gulp-browserify');
var child_process = require('child_process');

child_process.execSync('node ../node_modules/jison/lib/cli.js parser.json',{
    cwd: './src'
});

gulp.task('browserify', function(){
    return gulp.src('./expression-parser.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/'))
});

gulp.task('default', ['browserify']);