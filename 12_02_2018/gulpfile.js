var gulp      	= require('gulp'), // ���������� Gulp
    sass        = require('gulp-sass'), //���������� Sass �����,
    browserSync = require('browser-sync'), // ���������� Browser Sync
    concat      = require('gulp-concat'), // ���������� gulp-concat (��� ������������ ������)
    uglify      = require('gulp-uglifyjs'); // ���������� gulp-uglifyjs (��� ������ JS)
	cssnano     = require('gulp-cssnano'), // ���������� ����� ��� ����������� CSS
    concatCss 	= require('gulp-concat-css'); // ���������� ���������� ��� (��� ������������ ������)
	del         = require('del'); // ���������� ���������� ��� �������� ������ � �����
	imagemin    = require('gulp-imagemin'), // ���������� ���������� ��� ������ � �������������
    pngquant    = require('imagemin-pngquant'); // ���������� ���������� ��� ������ � png
	cache       = require('gulp-cache'); // ���������� ���������� �����������
	
gulp.task('sass', function(){ // ������� ���� Sass
    return gulp.src('app/sass/**/*.sass') // ����� ��� sass ����� �� ����� sass � ��������, ���� ������� �����
        .pipe(sass()) // ����������� Sass � CSS ����������� gulp-sass
        .pipe(gulp.dest('app/css')) // ��������� ���������� � ����� app/css
        .pipe(browserSync.reload({stream: true})) // ��������� CSS �� �������� ��� ���������
});

gulp.task('browser-sync', function() { // ������� ���� browser-sync
    browserSync({ // ��������� browserSync
        server: { // ���������� ��������� �������
            baseDir: 'app' // ���������� ��� ������� - app
        },
        notify: false // ��������� �����������
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // ����� ��� ����������� ����������
        'node_modules/jquery/dist/jquery.min.js', // ����� jQuery
        'node_modules/bootstrap/dist/bootstrap.min.js', // ����� Bootstrap
        'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js', // ����� jquery mask plugin
        'node_modules/slick-carousel/slick/slick.min.js' // ����� slick carousel
        ])
        .pipe(concat('vendor.min.js')) // �������� �� � ���� � ����� ����� libs.min.js
        .pipe(uglify()) // ������� JS ����
        .pipe(gulp.dest('app/js')); // ��������� � ����� app/js
});

gulp.task('css-libs', ['sass'], function() {
    gulp.src([ // ����� ��� ����������� ����������
        'node_modules/bootstrap/dist/css/bootstrap.min.css', // ����� Bootstrap
        'node_modules/font-awesome/css/font-awesome.min.css', // Font Awesome
        'node_modules/slick-carousel/slick/slick.css' // ����� Slick Slider
        ])
		.pipe(concatCss('vendor.min.css')) // �������� �� � ���� � ����� �����
		.pipe(cssnano()) // �������
		.pipe(gulp.dest('app/css')); // ��������� � ����� app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'build'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // ���������� �� sass ������� � ����� sass
    gulp.watch('app/*.html', browserSync.reload); // ���������� �� HTML ������� � ����� �������
    gulp.watch('app/js/**/*.js', browserSync.reload);   // ���������� �� JS ������� � ����� js
});

gulp.task('clean', function() {
    return del.sync('dist'); // ������� ����� dist ����� �������
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // ����� ��� ����������� �� app
        .pipe(cache(imagemin({  // ������� �� � ���������� ����������� � ������ �����������
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // ��������� �� ���������
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([ // ��������� ���������� � ���������
        'app/css/main.css',
        'app/css/vendor.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // ��������� ������ � ���������
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // ��������� ������� � ���������
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // ��������� HTML � ���������
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);