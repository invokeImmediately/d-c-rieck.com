<?php
/**
 * █▀▀▄ ▄▀▀▄ █▀▀▀ █▀▀▀    ▀█▀ █▀▀▄ █▀▀▀ ▐▀▀▄▐▀█▀▌  █▀▀▄ █  █ █▀▀▄
 * █▄▄▀ █▄▄█ █ ▀▄ █▀▀  ▀▀  █  █  █ █▀▀  █  ▐  █    █▄▄▀ █▀▀█ █▄▄▀
 * █    █  ▀ ▀▀▀▀ ▀▀▀▀    ▀▀▀ ▀▀▀  ▀▀▀▀ ▀  ▐  █  ▀ █    █  ▀ █
 *
 * Identifies the page the user has visited based on the URL that was accessed.
 *
 * @version 0.0.0
 * 
 * @author Daniel C. Rieck [danielcrieck@gmail.com] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/pg-ident.php
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

// Pull in dependencies for making database connections and obtaining the configuration for the
//   website.
require_once( ROOT_PATH . '/php-incl/db-conn.php' );
require_once( ROOT_PATH . '/php-incl/site-config.php' );

// Declare the DcrdcPgDbIntf class.
class DcrdcPgDbIntf {
  private $indtnBldBlk = "  ";
  protected $dbConn;
  protected $pgUri;
  protected $pgId;
  protected $siteCfg;

  public function __construct( $pgUri, $dbConn = NULL ) {
    $this->pgUri = $pgUri;

    // Set up a connection to the database.
    if ( empty( $dbConn ) || !( $dbConn instanceof DcrdcDbConn ) ) {
      $this->dbConn = new DcrdcDbConn();
    } else {
      $this->dbConn = $dbConn;
    }

    // Identify the ID of the page that is used in the database for tracking.  
    $this->pgId = $this->GetUriId( $pgUri );

    // Obtain configuration settings for the website.
    $this->siteCfg = new DcrdcSiteConfig( $this->dbConn );

    // Finish writing.
  }

  public function FavIcoLnsOut( $indtnLvl = 0, $indtn1stLn = false ) {
    $indtn = $this->GetIndtn( $indtnLvl );
    $favIcons = $this->GetSiteFavIcos();
  }

  protected function GetIndtn( $indtnLvl ) {
    if ( !is_int( $indtnLvl ) || $indtnLvl < 0 ) {
      $indtnLvl = 0;
    }
    return str_repeat( $this->$indtnBldBlk, $indtnLvl );
  }

  protected function GetUriId( $uri ) {
    $uriId = null;
    $qRes = $this->dbConn->RunQuery( "SELECT `uri_id` FROM `uri_ids` WHERE `uri_val` = '/dcrdc/'" );
    if( $qRes->num_rows == 1 ) {
      $row = $qRes->fetch_assoc();
      $uriId = $row[ "uri_id" ];
    } else {
      $possErrMsgs = array(
        "A URI was found that is not present in the site database.",
        "A URI was found in the database that had multiple IDs."
      );
      $whichErr = $qRes->num_rows > 0;
      $this->RepFatalErr( $possErrMsgs[ $whichErr ] );
    }
    return $uriId;
  }

  public function GetPgId() {
    return $this->pgId;
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
