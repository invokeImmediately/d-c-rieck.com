/**
 * ▓▓▓ Build Process: ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▓▒ ────────────────────────────────────── ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▒▒ █▀▀▀ █  █ █    █▀▀▄ █▀▀▀ ▀█▀ █    █▀▀▀ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▒▒▒ █ ▀▄ █  █ █  ▄ █▄▄▀ █▀▀▀  █  █  ▄ █▀▀  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▒▒▒ ▀▀▀▀  ▀▀  ▀▀▀  █    ▀    ▀▀▀ ▀▀▀  ▀▀▀▀ .less ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Gulp automation task definition file for setting up tasks that build CSS and
 *  JS files for use on the d-c-rieck.com portfolio and sandbox site.
 *
 * @version 0.1.1
 *
 * @author Daniel Rieck
 *  [danielcrieck@gmail.com]
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main…
 *  …/gulpfile.js
 *
 * @license MIT - Copyright (c) 2025 Daniel C. Rieck
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *   copy of this software and associated documentation files
 *   (the “Software”), to deal in the Software without restriction, including
 *   without limitation the rights to use, copy, modify, merge, publish,
 *   distribute, sublicense, and/or sell copies of the Software, and to permit
 *   persons to whom the Software is furnished to do so, subject to the
 *   following conditions:
 *  The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *   THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *   DEALINGS IN THE SOFTWARE.
 */

////////////////////////////////////////////////////////////////////////////////
//
// TABLE OF CONTENTS
// -----------------------------------------------------------------------------
//   §1: Persistent documentation for final output..........................43
//   §2: Handle Gulp task dependencies......................................55
//   §3: Declare CSS build task set up......................................69
//   §4: Declare JS build task set up......................................102
//   §5: Declare message logging process...................................107
//   §6: Execute set up of Gulp tasks......................................118
// -----------------------------------------------------------------------------
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// §1: PERSISTENT DOCUMENTATION for final output

/*!***
 * gulpfile.js - v0.0.0.
 * Gulp automation task definition file for setting up tasks that build CSS and JS files for use on d-c-rieck.com portfolio and sandbox site.
 * By Daniel C. Rieck (danielcrieck@gmail.com). See [GitHub](https://github.com/invokeImmediately/d-c-rieck.com/blob/main/gulpfile.js) for more info.
 * Copyright (c) 2025 Daniel C. Rieck and governed by the MIT license.
 ****/

'use strict';

////////////////////////////////////////////////////////////////////////////////
// §2: Handle Gulp task dependencies

// ·> Import Node.js Modules ·<
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const extName = require('gulp-extname');
const gap = require('gulp-append-prepend');
const gulp = require('gulp');
const lessc = require('gulp-less');
const notify = require('gulp-notify');
const preserveTsWs = require('gulp-preserve-typescript-whitespace');
const prettier = require('gulp-prettier');
const pump = require('pump');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// ·> Specify task names ·<
const compCssTaskNm = 'compileCss';
const compTsTaskNm = 'compileTs';


////////////////////////////////////////////////////////////////////////////////
// §3: Declare CSS build task set up

function setUpCssBuildTask(tskSttngs) {
  gulp.task(compCssTaskNm, function (callBack) {
    pump([
      gulp.src(tskSttngs.sourceFile).on('end', () => {
        logUpdate('Beginning CSS build process.');
      }),
      lessc({
        paths: [tskSttngs.dependenciesPath]
      }).on('end', () => {
        logUpdate('Finished compiling precompiled CSS written in the Less language extension of CSS.');
      }),
      replace(tskSttngs.commentRemovalNeedle, '').on('end', () => {
        logUpdate('Removed comments not marked as persistent.');
      }),
      gulp.dest(tskSttngs.destFolder).on('end', () => {
        logUpdate('Unminified CSS file has been built and written.');
      }),
      cleanCss().on('end', () => {
        logUpdate('Finished minifying CSS.');
      }),
      extName(tskSttngs.minCssFileExtension),
      gulp.dest(tskSttngs.destFolder).on('end', () => {
        logUpdate('Minified CSS file has been built and written.');
      }),
      notify('The gulp-automated CSS build process has completed.')
    ], callBack);
  });
}

////////////////////////////////////////////////////////////////////////////////
// §4: Declare JS build task set up

// ·> Define the task for compiling TS into JS ·<
gulp.task(compTsTaskNm, function (cb) {
  const tsResult = pump([
    tsProject.src(),
    preserveTsWs.saveWhitespace().on('end', () => {
      logUpdate('Whitespace was preserved before compiling TS into JS.');
    }),
    tsProject()
  ], cb);
  pump([
    tsResult.js,
    preserveTsWs.restoreWhitespace().on('end', () => {
      logUpdate('Whitespace was restored to the compiled JS.');
    }),
    prettier({tabWidth: 2}).on('end', () => {
      logUpdate('Compiled JS has been prettified.');
    }),
    gulp.dest('JS').on('end', () => {
      logUpdate('Unminified JS file has been written.');
    }),
    terser({output: {comments: /^!/}}).on('end', () => {
      logUpdate('Finished minifying JS with Terser.');
    }),
    extName('.min.js'),
    gulp.dest('JS').on('end', () => {
      logUpdate("Minified JS file has been written; '\u001b[36m" + compTsTaskNm + "\u001b[39m' now truly finished.");
    })
  ], cb);
});

////////////////////////////////////////////////////////////////////////////////
// §5: Declare message logging process

function logUpdate( msg ) {
  let now = new Date();
  console.log('[\x1b[1;30m%s\x1b[0m] ' + msg,
    now.getHours().toString().padStart( 2, '0') + ':' +
    now.getMinutes().toString().padStart(2, '0') + ':' +
    now.getSeconds().toString().padStart( 2, '0'));
}

////////////////////////////////////////////////////////////////////////////////
// §6: Execute set up of Gulp tasks

setUpCssBuildTask({
  commentRemovalNeedle: /^(?:[ \t]*)?\/\*[^!].*$\n(?:^[ \t]*\*\*?[^\/].*$\n)*[ \t]*\*\*?\/\n?/gm,
  dependenciesPath: './Less/',
  destFolder: './CSS/',
  minCssFileExtension: '.min.css',
  sourceFile: './Less/styles.less',
});
