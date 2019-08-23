const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-mocha')
const babel = require('gulp-babel')
const gulpif = require('gulp-if')
const del = require('del')
const gulpsync = require('gulp-sync')(gulp)
const gutil = require('gulp-util')
const minify = require('gulp-minify')
const git = require('gulp-git')
const deploy = require('gulp-deploy-git')
const argv = require('yargs').argv

// gulp.task('set-system-env', () => {}) // uso futuro 
// gulp.task('set-system-env-testdb', {}) // uso futuro 

gulp.task('server', [], () => {
    nodemon({
        // the script to run the app
        script: 'app.js',
        ext: 'js',
    })
})

gulp.task('server-test', [], () => {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'app.js',
        ext: 'js',
    })
})

gulp.task('setup-test', () =>
    gulp.src('tests/integration/setup.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
            compilers: 'js:babel-core/register',
        }))
)
gulp.task('test-integration', () =>
    gulp.src('tests/integration/*.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
            compilers: 'js:babel-core/register',
            timeout: 10000,
        }))
)


gulp.task('test-unit', () =>
    gulp.src('tests/unit/*.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
            compilers: 'js:babel-core/register',
            timeout: 20000,
        }))
)

gulp.task('test-integration-temp', () =>
    gulp.src('tests/integration/test-change-password.js', { read: false })
        .pipe(mocha({
            reporter: 'spec',
            compilers: 'js:babel-core/register',
        }))
)


gulp.task('set-pre-db-target-env', () => (process.env.TARGET_DATABASE = 'GanhoMaisPreProducao'))
gulp.task('set-pre-test-db-target-env', () => (process.env.TARGET_DATABASE = 'GanhoMaisPreProducaoTESTE'))

gulp.task('set-db-verbose', () => (process.env.DB_VERBOSE = true))

gulp.task('pre', () =>
// configure nodemon
    nodemon({
    // the script to run the app
        script: 'app.js',
        ext: 'js',
        exec: 'babel-node',
    })
)

/* Build to Server
========================================================================== */

gulp.task('clean-dist', () => del(['dist/**/*']))
gulp.task('es6', (done) => {
    gulp.src(['./**/*', '!./node_modules/**', '!dist', '!./files_import/**', '!files_import', '!node_modules'])
        .pipe(gulpif('*.js', babel({
            ignore: ['gulpfile.babel.js', './node_modules/**/*.js'],
        })))
        .pipe(gulpif('*.js', minify({
            noSource: true,
            ext: {
                min: '.js',
            },
        })))
        .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
        .pipe(gulp.dest('./dist'))
        .on('end', done)
})

/* Git Operations
========================================================================== */
gulp.task('commit-push', () => gulp.src('dist/**/*', { read: false })
    .pipe(deploy({
        repository: 'https://gitlab.com/koruja/ganhomais/api-prod.git',
        message: argv.m || 'New release xx.xx.xx',
        prefix: 'dist',
    })))

gulp.task('pull', () => {
    git.pull('origin', 'master', { args: '--rebase' }, (err) => {
        if (err) throw err
    })
})

gulp.task('checkout', () => {
    git.checkout('branchName', (err) => {
        if (err) throw err
    })
})

/* Export Tasks
========================================================================== */

gulp.task('default', ['server'])

gulp.task('test', gulpsync.sync(['setup-test', 'test-integration']))
gulp.task('test-pre', gulpsync.sync(['set-pre-db-target-env', 'setup-test', 'test-integration']))
gulp.task('test-temp', ['setup-test', 'test-integration-temp'])
gulp.task('preproduction', ['set-pre-db-target-env', 'pre'])
gulp.task('preproduction-test', ['set-pre-test-db-target-env', 'pre'])
gulp.task('verb', ['set-db-verbose', 'pre'])

// Release or Build
gulp.task('build', gulpsync.sync(['clean-dist', 'es6']))
gulp.task('deploy', gulpsync.sync(['build', 'commit-push']))

