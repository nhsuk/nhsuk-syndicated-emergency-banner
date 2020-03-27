const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

// Compile NHSUK Frontend SCSS for dev app
function compileCSS() {
  return gulp.src([
    'src/scss/nhsuk.scss',
  ])
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/'));
}

// Transpile ES6 code and import HTML and SCSS
function webpackJS() {
  return gulp.src('src/js/index.js')
    .pipe(webpack({
      mode: 'production',
      module: {
        rules: [{
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                conservativeCollapse: false,
                minimize: true,
              },
            },
          ],
        }],
      },
      output: {
        filename: 'banner.js',
      },
      target: 'web',
    }))
    .pipe(gulp.dest('./dist'));
}

gulp.task('default', () => {
  // Compile CSS and JS
  webpackJS();
  compileCSS();

  // Start simple browsersync server
  browserSync.init({
    server: {
      baseDir: './app',
      routes: {
        '/dist': './dist',
        '/mocks': './mocks',
      },
    },
  });

  // Reload server on HTML changes
  gulp.watch('app/*.html').on('change', browserSync.reload);

  // Watch src CSS and JS and recompile dist
  gulp.watch('./src/**/*', gulp.series([webpackJS]));

  // Subscribe server to CSS and JS updates
  gulp.watch('./dist/*').on('change', browserSync.reload);
});

gulp.task('build', (done) => {
  webpackJS();
  done();
});
