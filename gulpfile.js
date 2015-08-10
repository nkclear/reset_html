// パッケージをインポートする
var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var browserSync = require("browser-sync");
 
// ディレクトリ設定
var dir = {
    src: '_src', // _srcフォルダ置き換え
    dist: 'dist' // destフォルダ置き換え
}








//Browsersync
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "_src" // ルートとなるディレクトリを指定
        },
        notify: false

    });
    // srcフォルダ以下のファイルを監視
    //gulp.watch("_src/**", function() {
      //  browserSync.reload();   // ファイルに変更があれば同期しているブラウザをリロード
    //});
});

//gulp.task('default', ['browser-sync']);
 
// Compassの設定
gulp.task('compass', function() {
    return gulp.src( dir.src + '/{,**/}*.scss' ) // 読み込みファイル
    .pipe(compass({
        config_file: 'config.rb', // confing.rb を読み込む
        css: dir.src + '/css/', // 書き出し先
        sass: dir.src + '/sass/' // 読み込み先
    }));
});
 
// 簡易サーバー
gulp.task('connect', function() {
    return connect.server({
        port: 3000, // ポート番号を設定
        root: dir.src, // ルートディレクトリの場所を指定
        livereload: true // ライブリロードを有効にする
    });
});
 
// 自動更新
gulp.task('reload', function () {
    return gulp.src(dir.src + '/{,**/}*.html')
    .pipe(connect.reload());
    browserSync.reload();

});
 
// ファイル更新監視
gulp.task('watch', function() {
    // scssの監視
    gulp.watch([ 
        dir.src + '/{,**/}*.scss' // 対象ファイル
    ],['compass']); // 実行タスク（css 開発用）
    gulp.watch([
        dir.src + '/{,**/}*.html', // 対象ファイル
        dir.src + '/{,**/}*.css',
        dir.src + '/{,**/}*.js'
    ], function() {
        browserSync.reload();   // ファイルに変更があれば同期しているブラウザをリロード
    }); // 実行タスク（scss ファイル以外が更新されたタイミングでブラウザを自動更新）

});
 
// ベンダープレフィックス付与設定
gulp.task('autoprefixer', function () {
    return gulp.src( dir.src + '/{,**/}*.css' ) // 読み込みファイル
    .pipe(autoprefixer({
        browsers: ['last 2 versions'] // 対象ブラウザの設定
    }))
    .pipe( gulp.dest( dir.dist ) ); // 書き出しファイル
});
 
// CSSのプロパティの順番整理
gulp.task('csscomb', function () {
  return gulp.src(dir.src + '/{,**/}*.css') // 読み込みファイル
    .pipe(csscomb())
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});
 
// 画像を圧縮
gulp.task('imagemin', function () {
    return gulp.src( dir.src + '/{,**/}*.{png,jpg,gif}' ) // 読み込みファイル
    .pipe(imagemin())
    .pipe(gulp.dest( dir.dist )); // 書き出し先
});
 
// ファイルのコピー
gulp.task('copy', function () {
    return gulp.src([
        dir.src + '/{,**/}*.html', // 対象ファイル
        dir.src + '/{,**/}*.js'
    ])
    .pipe(gulp.dest( dir.dist ));
});
 
// 不要なファイルを削除する
// distフォルダ内を一度全て削除する
gulp.task('clean-dist', function () {
    return gulp.src([
        dir.dist + '/{,**/}*.html', // 対象ファイル
        dir.dist + '/css',
        dir.dist + '/js',
        dir.dist + '/img'
    ], {read: false} )
    .pipe(clean());
});
// スプライト画像の生成データを全て削除する
gulp.task('clean-sprite', function () {
    return gulp.src( [
        dir.dist + '/{,**/}sprite-*.png', // 乱数付きのスプライト画像
        dir.dist + '/{,**/}sprite' // スプライト画像生成フォルダ
    ], {read: false} )
    .pipe(clean());
});
 
// 以下タスクの登録
// デフォルト（各ファイル監視してビルド）
gulp.task('default', [
    'browser-sync',
    'connect',
    'watch'
]);
// リリース用ビルド
gulp.task('dist', function(callback) {
  return runSequence( // タスクを直列処理する
    'clean-dist',
    'compass',
    ['autoprefixer','imagemin'],
    'csscomb',
    'copy',
    'clean-sprite',
    callback
  );
});