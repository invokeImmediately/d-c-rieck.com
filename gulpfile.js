/*-*************************************************************************************************
 * █▀▀▀ █  █ █    █▀▀▄ █▀▀▀ ▀█▀ █    █▀▀▀      █ ▄▀▀▀
 * █ ▀▄ █  █ █  ▄ █▄▄▀ █▀▀▀  █  █  ▄ █▀▀    ▄  █ ▀▀▀█
 * ▀▀▀▀  ▀▀  ▀▀▀  █    ▀    ▀▀▀ ▀▀▀  ▀▀▀▀ ▀ ▀▄▄█ ▀▀▀ 
 *
 * Gulp automation task definition file for setting up tasks that build CSS and JS files for use on
 *   d-c-rieck.com portfolio and sandbox site.
 *
 * @version 0.0.0
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/gulpfile.js
 * @author Daniel Rieck [danielcrieck@gmail.com] (https://github.com/invokeImmediately)
 * @license MIT - Copyright (c) 2022 Daniel C. Rieck
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the “Software”), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
 *     the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// TABLE OF CONTENTS
// ----------------------------------------------------------------------------------------------
//   §1: Persistent documentation for final output.............................................43
//   §2: Import Node.js modules................................................................55
//   §3: Declare CSS build task set up.........................................................69
//   §4: Declare JS build task set up.........................................................102
//   §5: Declare message logging process......................................................107
//   §6: Execute set up of Gulp tasks.........................................................118
// ----------------------------------------------------------------------------------------------
//
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: PERSISTENT DOCUMENTATION for final output

/*!***
 * gulpfile.js - v0.0.0.
 * Gulp automation task definition file for setting up tasks that build CSS and JS files for use on d-c-rieck.com portfolio and sandbox site.
 * By Daniel C. Rieck (danielcrieck@gmail.com). See [GitHub](https://github.com/invokeImmediately/d-c-rieck.com/blob/main/gulpfile.js) for more info.
 * Copyright (c) 2022 Daniel C. Rieck and governed by the MIT license.
 ****/

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Import Node.js modules

const cleanCss = require( 'gulp-clean-css' );
const concat = require( 'gulp-concat' );
const extName = require( 'gulp-extname' );
const gap = require( 'gulp-append-prepend' );
const gulp = require( 'gulp' );
const lessc = require( 'gulp-less' );
const notify = require( 'gulp-notify' );
const replace = require( 'gulp-replace' );
const terser = require( 'gulp-terser' );
const pump = require( 'pump' );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Declare CSS build task set up

function setUpCssBuildTask( ts ) {
  gulp.task( 'buildCss', function ( callBack ) {
    pump( [
      gulp.src( ts.sourceFile ).on( 'end', () => {
        logUpdate( 'Beginning CSS build process.' );
      } ),
      lessc( {
        paths: [ts.dependenciesPath]
      } ).on( 'end', () => {
        logUpdate( 'Finished compiling precompiled CSS written in the Less' +
          ' language extension of CSS.' );
      } ),
      replace( ts.commentRemovalNeedle, '' ).on( 'end', () => {
        logUpdate( 'Removed comments not marked as persistent.' );
      } ),
      gulp.dest( ts.destFolder ).on( 'end', () => {
        logUpdate( 'Unminified CSS file has been built and written.' );
      } ),
      cleanCss().on( 'end', () => {
        logUpdate( 'Finished minifying CSS.' );
      } ),
      extName( ts.minCssFileExtension ),
      gulp.dest( ts.destFolder ).on( 'end', () => {
        logUpdate( 'Minified CSS file has been built and written.' );
      } ),
      notify( 'The gulp-automated CSS build process has completed.' )
    ], callBack );    
  } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §4: Declare JS build task set up

// @todo Finish writing.

////////////////////////////////////////////////////////////////////////////////////////////////////
// §5: Declare message logging process

function logUpdate( msg ) {
  let now = new Date();
  console.log( '[\x1b[1;30m%s\x1b[0m] ' + msg,
    now.getHours().toString().padStart( 2, '0' ) + ':' +
    now.getMinutes().toString().padStart(2, '0') + ':' +
    now.getSeconds().toString().padStart( 2, '0' ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §6: Execute set up of Gulp tasks

setUpCssBuildTask( {
  commentRemovalNeedle: /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm,
  dependenciesPath: './Less/',
  destFolder: './CSS/',
  minCssFileExtension: '.min.css',
  sourceFile: './Less/styles.less',
} );
