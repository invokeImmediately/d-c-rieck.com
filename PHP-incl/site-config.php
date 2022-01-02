<?php
/**
 * ▄▀▀▀ ▀█▀▐▀█▀▌█▀▀▀    ▄▀▀▀ ▄▀▀▄ ▐▀▀▄ █▀▀▀ ▀█▀ █▀▀▀   █▀▀▄ █  █ █▀▀▄
 * ▀▀▀█  █   █  █▀▀  ▀▀ █    █  █ █  ▐ █▀▀▀  █  █ ▀▄   █▄▄▀ █▀▀█ █▄▄▀
 * ▀▀▀  ▀▀▀  █  ▀▀▀▀     ▀▀▀  ▀▀  ▀  ▐ ▀    ▀▀▀ ▀▀▀▀ ▀ █    █  ▀ █
 *
 * Provides page configuration settings that are used on all pages.
 *
 * @version 0.1.0
 *
 * @author Daniel C. Rieck [danielcrieck@gmail.com] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/pg-meta.php
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
require_once( ROOT_PATH . '/php-incl/res-id-loc.php' );

// Declare the DcrdcPgMeta class.
class DcrdcPgMeta {
  protected $dbConn;
  protected $pgId;
  protected $rowLimits = array( "favIcos"=>64 );

  public function __construct( $dbConn, $pgId ) {
    // Ensure a valid connection to the site database.
    if ( empty( $dbConn ) || !( $dbConn instanceof DcrdcDbConn ) ) {
      $this->RepFatalErr( "I was not supplied with a valid connection to the site database from which to obtain page metadata." );
    } else {
      $this->dbConn = $dbConn;
    }
    // Finish writing.
  }

  public function GetPgId() {
    return $this->pgId;
  }

  public function FavIcoLnsOut( $indtnLvl, $indtn1stLn ) {
    $indtn = $this->GetIndtn( $indtnLvl );
    $favIcons = $this->GetSiteFavIcos();
    $loopLimit = $this->$rowLimits[ "favIcos" ];
    $i = 0;
    $lineCount = 0;
    $indtn = $this->GetIndtn( $indtnLvl );
    while ( $row = $favIcos->fetch_assoc() && $i < $loopLimit ) {
      // Proceed only if the favicon is still active.
      $isActive = $row[ "active" ];
      if ( !$isActive ) {
        $i++;
        continue;
      }

      // Get the URL to the favicon image file.
      $uriId = $row[ "uri_id" ];
      $uri = $this->GetUriFromId( $uriId );
      $type = $row[ "type" ];
      $rel = $row[ "rel" ];
      $sizes = $row[ "sizes" ];
      $color = $row[ "hex_color" ];

      // Output indententation.
      if ( $i == 0 && $indtn1stLn == true ) {
        echo $indtn;
      }

      // Output link starting with rel and type attributes.
      echo "<link rel=\"$rel\" type=\"$type\"";

      // Output the sizes attribute, if appropriate.
      if ( $sizes ) {
        echo " sizes=\"$sizes\"";
      }

      // Output the color attribute, if appropriate.
      if ( $color ) {
        echo " color=\"$color\"";
      }

      // Output the href attribute and complete the tag.
      echo "href=\"$uri\">\n";

      // Increment the loop's iteration tracking variables.
      $lineCount++;
      $i++;
    }
    if ( $i == $loopLimit ) {
      $this->RepFatalErr( "The loop for outputting favicon links exceeded the internal limit and was prematurely suspended to avoid a possible infinite loop." );
    }
  }

  protected function GetSiteFavIcos() {
    $qStr = "SELECT `uri_id` FROM `site_config` WHERE `setting_type`='favico' AND `active`=1";
    $favIcos = $this->dbConn->RunQuery( $this->qStr );
    return $favIcos;
  }

  protected function RepFatalDataErr( $msg = NULL ) {
    if ( $msg == NULL ) {
      $msg = "An unclassified error was reported.";
    }
    $finalMsg = "Fatal data error: " . $msg . " Consequently, I am aborting my attempt to set up the requested page.";
    die( $finalMsg );
  }

  // Finish writing class.
}

?>
