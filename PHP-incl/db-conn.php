<?php

/**
 * ▓▓▓ PHP Includes: ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▓▒ ──────────────────────────────── ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * ▓▒▒ █▀▀▄ █▀▀▄    ▄▀▀▀ ▄▀▀▄ ▐▀▀▄ ▐▀▀▄ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▒▒▒ █  █ █▀▀▄ ▀▀ █    █  █ █  ▐ █  ▐  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▒▒▒ ▀▀▀  ▀▀▀      ▀▀▀  ▀▀  ▀  ▐ ▀  ▐ .php ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Facilitates a connection to the website's database and runs queries requested
 *  by the index sript.
 * 
 * @version 0.1.2
 * 
 * @author Daniel C. Rieck
 *  [danielcrieck@gmail.com]
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/db-conn.php
 *
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

// ·> d-c-rieck.com Database Connection class §                               <·
class DcrdcDbConn {

  // ·> Private Properties §                                                  <·
  private $dbName;       // Database name
  private $dbServerName; // Database server name
  private $dbUserName;   // Database user passwords
  private $dbUserPassword;  // Database user password
  private $iniSettings;      // Initialization settings

  // ·> Default Private Properties §                                          <·
  private $defDbUsrNm = "abc†‡actualUserName‡†xyz";
  private $defDbUsrPwd = "abc†‡actualPassword‡†xyz";

  // ·> Protected Properties §
  protected $dbConn;     // Database connection
  protected $qStr;       // Query string
  protected $qRes;       // Query result

  // ·> Public Methods §                                                      <·
  public function __construct( $iniFile = INI_PATH . '/dcrdc_dbConn.ini' ) {

    // ·> Obtain the settings for interacting with the database.
    $this->iniSettings = parse_ini_file( $iniFile );
    if ( !$this->iniSettings ) {
      throw new exception('Unable to open ' . $iniFile . '.');
    }
    $this->dbServerName = $this->iniSettings[ 'dbSvrNm' ];
    $this->dbUserName = $this->iniSettings[ 'dbUsrNm' ];
    $this->dbUserPassword = $this->iniSettings[ 'dbUsrPwd' ];
    $this->dbName = $this->iniSettings[ 'dbNm' ];

    // ·> Check if the developer has not set up the ini file.                 <·
    if (
      $this->dbUserName == $this->defDbUsrNm &&
      $this->dbUserPassword == $this->defDbUsrPwd
    ) {
      RepFatalErr( "I am seeing that the details for accessing the website's database were never specified after cloning the project." );
    }

    // ·> Attempt a connection with the database and report any issues.       <·
    $this->dbConn = new mysqli( $this->dbServerName, $this->dbUserName,
      $this->dbUserPassword, $this->dbName );
    if ( $this->dbConn->connect_error ) {
      $this->RepFatalErr( "An attempt to connect to the database failed. The error message was: " . $this->dbConn->connect_error);
    }
  }

  public function __destruct() {
    $this->dbConn->close();
  }

  public function RunQuery( $qStr ) {
    // ·> Only run approved queries.                                          <·
    if( !$this->IsQStrValid( $qStr ) ) {
      $this->RepFatalErr( 'I am rejecting an attempt to run a query using an unapproved syntax pattern.' );
    }

    // ·> The query string passed inspection, so go ahead and run it.         <·
    $this->qStr = $qStr;
    $this->qRes = $this->dbConn->query( $this->qStr );
    if ( $this->dbConn->error ) {
      $this->RepFatalErr( $this->dbConn->error );
    }

    // ·> Return the result of the query.                                     <·
    return $this->qRes;
  }

  // ·> Protected methods §                                                   <·
  protected function IsQStrValid( $qStr ) {
    // ·> TO-DO: Delete the following?                                        <·
    // $ptrn = "/SELECT (?:`.+?`|\*) FROM (?:`.+?`) WHERE (?:`.+?` ?(?:=|>|<|>=|<=|<>) ?(?:[01]|'.+?'))(?:(?: ?AND ?| ?OR ?)(?:`.+?`(?:=|>|<|>=|<=|<>)(?:[01]|'.+?')))*/Ai";

    // ·> Only allow data to be read from the database.                       <·
    $ptrn = "/SELECT.+?FROM.+?WHERE.+/Ai";
    $validity = preg_match( $ptrn, $qStr );
    return $validity;
  }

  protected function RepFatalErr( $msg = NULL ) {
    if ( $msg == NULL ) {
      $msg = "An unclassified error was reported.";
    }
    $finalMsg = "Fatal database error: " . $msg . " Consequently, I am aborting my attempt to set up the requested page.";
    die( $finalMsg );
  }
}

?>
