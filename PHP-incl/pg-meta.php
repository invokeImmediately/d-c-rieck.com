<?php

/**
 * ▓▓▓ PHP Includes: ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▓▒ ─────────────────────────────── ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▒▒ █▀▀▄ █▀▀▀    ▐▀▄▀▌█▀▀▀▐▀█▀▌▄▀▀▄ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▒▒▒ █▄▄▀ █ ▀▄ ▀▀ █ ▀ ▌█▀▀   █  █▄▄█ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▒▒▒ █    ▀▀▀▀    █   ▀▀▀▀▀  █  █  ▀ .php ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Provides page configuration settings that are used on all pages.
 *
 * @version 0.1.1
 *
 * @author Daniel C. Rieck
 *  [danielcrieck@gmail.com]
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/pg-meta.php
 * @license MIT Copyright (c) 2023 Daniel C. Rieck
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *   copy of this software and associated documentation files
 *   (the "Software"), to deal in the Software without restriction, including
 *   without limitation the rights to use, copy, modify, merge, publish,
 *   distribute, sublicense, and/or sell copies of the Software, and to permit
 *   persons to whom the Software is furnished to do so, subject to the
 *   following conditions:
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

// ·> Before pulling in code from source files, ensure we have a root path to  ·
// ·  work with.                                                              <·
require_once( $_SERVER['DOCUMENT_ROOT'] . '/php-incl/defineSitePaths.php' );

// ·> Pull in the dependencies for making database connections.               <·
require_once( ROOT_PATH . '/php-incl/db-conn.php' );
require_once( ROOT_PATH . '/php-incl/res-id-loc.php' );

// ·> Declare the DcrdcPgMeta class.                                          <·
class DcrdcPgMeta {

  // ·> Protected properties §                                                <·
  protected $dbConn;
  protected $pgId;
  protected $rowLimits = array( "favIcos"=>64 );

  // ·> Constructor §                                                         <·
  public function __construct( $dbConn, $pgId ) {
    // ·> Ensure a valid connection to the site database.                     <·
    if ( empty( $dbConn ) || !( $dbConn instanceof DcrdcDbConn ) ) {
      $this->RepFatalErr( "I was not supplied with a valid connection to the site database from which to obtain page metadata." );
    } else {
      $this->dbConn = $dbConn;
    }
    // ·> TO-DO: Finish writing constructor.                                  <·
  }

  // ·> Public Methods §                                                      <·
  public function GetPgId() {
    return $this->pgId;
  }

  public function OutputFavIconLines( $ind7nLevel, $firstLineInd7n = false ) {
    $ind7n = $this->GetInd7n( $ind7nLevel ); // TO-DO: Write this function.
    $favIcons = $this->GetSiteFavIcons();
    $loopLimit = $this->$rowLimits[ "favIcos" ];
    $i = 0;
    $lineCount = 0;
    while ( $row = $favIcos->fetch_assoc() && $i < $loopLimit ) {
      // Proceed only if the favicon is still active.
      $isActive = $row[ "active" ];
      if ( !$isActive ) {
        $i++;
        continue;
      }

      // ·> Get the URL to the favicon image file.                            <·
      $uriId = $row[ "uri_id" ];
      $uri = $this->GetUriFromId( $uriId );
      $type = $row[ "type" ];
      $rel = $row[ "rel" ];
      $sizes = $row[ "sizes" ];
      $color = $row[ "hex_color" ];

      // ·> Output indentation.                                               <·
      if ( $i > 0 || $firstLineInd7n == true ) {
        echo $ind7n;
      }

      // ·> Output link starting with rel and type attributes.                <·
      echo "<link rel=\"$rel\" type=\"$type\"";

      // ·> Output the sizes attribute, if appropriate.                       <·
      if ( $sizes ) {
        echo " sizes=\"$sizes\"";
      }

      // ·> Output the color attribute, if appropriate.                       <·
      if ( $color ) {
        echo " color=\"$color\"";
      }

      // ·> Output the href attribute and complete the tag.                   <·
      echo "href=\"$uri\">\n";

      // ·> Increment the loop's iteration tracking variables.                <·
      $lineCount++;
      $i++;
    }
    if ( $i == $loopLimit ) {
      $this->RepFatalErr( "The loop for outputting favicon links exceeded the internal limit and was prematurely suspended to avoid a possible infinite loop." );
    }
  }

  // ·> Protected methods §                                                   <·
  protected function GetSiteFavIcons() {
    // ·> TO-DO: Rewrite this function. Use an inner join as started below.    ·
    // ·   $qStr = "SELECT `uri_id` FROM `site_config` INNER JOIN `…` … WHERE  ·
    // ·     `setting_type`='favico' AND `active`=1  ";                       <·
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

  // ·> TO-DO: Finish writing class.                                          <·
}

?>
