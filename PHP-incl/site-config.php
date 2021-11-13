<?php
/**
 * ▄▀▀▀ ▀█▀▐▀█▀▌█▀▀▀    ▄▀▀▀ ▄▀▀▄ ▐▀▀▄ █▀▀▀ ▀█▀ █▀▀▀   █▀▀▄ █  █ █▀▀▄
 * ▀▀▀█  █   █  █▀▀  ▀▀ █    █  █ █  ▐ █▀▀▀  █  █ ▀▄   █▄▄▀ █▀▀█ █▄▄▀
 * ▀▀▀  ▀▀▀  █  ▀▀▀▀     ▀▀▀  ▀▀  ▀  ▐ ▀    ▀▀▀ ▀▀▀▀ ▀ █    █  ▀ █
 *
 * Provides site configuration settings that are used on all pages.
 *
 * @version 0.0.0
 * 
 * @author Daniel C. Rieck [danielcrieck@gmail.com] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/site-config.php
 * @license MIT Copyright (c) 2021 Daniel C. Rieck
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the "Software"), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
 *     the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 *     CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 *     ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *     SOFTWARE.
 */

// Before pulling in code from source files, ensure we have a root path to work with.
if( !function_exists( 'defineRootPath' ) ) {
  function defineRootPath() {
    if ( !defined( 'ROOT_PATH' ) ) {
      define( 'ROOT_PATH', $_SERVER['DOCUMENT_ROOT'] . 'dcrdc' );
    } 
  }
}
defineRootPath();

// Pull in the dependency for making database connections.
require_once( ROOT_PATH . '/php-incl/db-conn.php' );

// Declare the DcrdcSiteConfig class.
class DcrdcSiteConfig {
  protected $dbConn;

  public function __construct( $dbConn = NULL ) {
    // Set up a connection to the database.
    if ( empty( $dbConn ) || !( $dbConn instanceof DcrdcDbConn ) ) {
      $this->dbConn = new DcrdcDbConn();
    } else {
      $this->dbConn = $dbConn;
    }
    // Finish writing.
  }

  public function GetPgId() {
    return $this->pgId;
  }

  // Finish writing class.
}

?>
