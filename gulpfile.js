var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		imagemin 	   = require('gulp-imagemin'),
		cache 		   = require('gulp-cache'),
	    pngquant 	   = require('imagemin-pngquant'),
		autoprefixer   = require('gulp-autoprefixer'),
		del 		   = require('del'),
		notify         = require("gulp-notify"),
		babel		   = require("gulp-babel");

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function() {
	return gulp.src([
		'app/js/common.js', // Всегда в конце
	]).pipe(babel({
      presets: ['es2015']
    }))
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

// gulp.task('scripts', function(){
//     return gulp.src([
//         'app/libs/jquery/dist/jquery.min.js',
//         'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
//     ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
// })

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('clean', function(){
    return del.sync('dist');
})

gulp.task('clear', function(){
    return cache.clearALL();
})

gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use:[pngquant()]
    })))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){

    var buildCss = gulp.src([
        'app/css/main.min.css'
    ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

})

gulp.task('default', ['watch']);
