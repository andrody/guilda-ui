const gulp = require('gulp')
const del = require('del')
const gulpsync = require('gulp-sync')(gulp)
const deploy = require('gulp-deploy-git')
const argv = require('yargs').argv
const run = require('gulp-run')
const git = require('gulp-git')
const exec = require('child_process').exec

/* Build to Server
========================================================================== */

gulp.task('clean-dist', () => del(['dist/**/*', '!dist/production/**/*', '!dist/staging/**/*']))

gulp.task('build-webpack', () => run('webpack --config webpack.config.production.js').exec())

/* Git Operations
========================================================================== */
gulp.task('add', () => gulp.src('.')
    .pipe(git.add()))

// Run git commit
// src are the files to commit (or ./*)
gulp.task('commit', () => gulp.src('.')
    .pipe(git.commit('build')))

gulp.task('push', () => {
    const pushProcess = exec('git push dokku@167.99.239.43:legapy-web master', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        }
    })
    pushProcess.stdout.on('data', (data) => {
        console.log(data)
    })
})

/* Export Tasks
========================================================================== */

gulp.task('build', gulpsync.sync(['clean-dist', 'build-webpack']))
gulp.task('git', gulpsync.sync(['add', 'commit']))
gulp.task('deploy', gulpsync.sync(['build', 'git', 'push']))
