<?php

/**
 * ▓▓▓ PHP Includes: ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▓▒ ──────────────────────────────────────────────── ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▒▒ define ▄▀▀▀ ▀█▀▐▀█▀▌█▀▀▀ █▀▀▄ ▄▀▀▄▐▀█▀▌█  █ ▄▀▀▀ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▒▒▒▒▒▒▒▒▒▒ ▀▀▀█  █   █  █▀▀  █▄▄▀ █▄▄█  █  █▀▀█ ▀▀▀█ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▒▒▒▒▒▒▒▒▒▒ ▀▀▀  ▀▀▀  █  ▀▀▀▀ █    █  ▀  █  █  ▀ ▀▀▀  .php ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Establishes definitions for paths to locations on the server important for
 *  delivering site content via PHP.
 *
 * @version 0.0.1
 *
 * @author Daniel C. Rieck
 *  [danielcrieck@gmail.com]
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/defineSitePaths.php
 *
 * @license MIT Copyright (c) 2023 Daniel C. Rieck
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to
 *   deal in the Software without restriction, including without limitation the
 *   rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *   sell copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *  The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *   THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *   DEALINGS IN THE SOFTWARE.
 */

// ·> Define a briefer alias to the document root on the server, or what will  ·
// ·  be referred to as the "root path.                                       <·
if( !function_exists( 'defineRootPath' ) ) {
  function defineSiteRootPath() {
    if ( !defined( 'ROOT_PATH' ) ) {
      define( 'ROOT_PATH', $_SERVER['DOCUMENT_ROOT'] );
    } 
  }
}

defineSiteRootPath();

// ·> Working off the root path, define an alias to the path on the server     ·
// ·  where initialization files are kept.                                    <·
if( !function_exists( 'defineSitePhpIniPath' ) ) {
  function defineSitePhpIniPath() {
    if ( !defined( 'INI_PATH' ) ) {
      define( 'INI_PATH', ROOT_PATH . '/php-ini' );
    } 
  }
}

defineSitePhpIniPath();

// ·> Working off the root path, define an alias to the path on the server     ·
// ·  where dependencies for other script files are kept.                     <·
if( !function_exists( 'defineSitePhpIncludePath' ) ) {
  function defineSitePhpIncludePath() {
    if ( !defined( 'INCLUDE_PATH' ) ) {
      define( 'INCLUDE_PATH', ROOT_PATH . '/php-incl' );
    } 
  }
}

defineSitePhpIncludePath();

?>
