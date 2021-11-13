<?php

/**
 * █▀▀▄ █▀▀▄    ▄▀▀▀ ▄▀▀▄ ▐▀▀▄ ▐▀▀▄   █▀▀▄ █  █ █▀▀▄
 * █  █ █▀▀▄ ▀▀ █    █  █ █  ▐ █  ▐   █▄▄▀ █▀▀█ █▄▄▀
 * ▀▀▀  ▀▀▀      ▀▀▀  ▀▀  ▀  ▐ ▀  ▐ ▀ █    █  ▀ █  
 * 
 * Facilitates a connection to the website's database and runs queries requested by the sript.
 * 
 * @version 0.0.0
 * 
 * @author Daniel C. Rieck [danielcrieck@gmail.com] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/PHP-incl/db-conn.php
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

class DcrdcDbConn {
  private $dbSvrNm = "site.test";
  private $dbUsrNm = "†‡actualUserName‡†";
  private $dbUsrPwd = "†‡actualPassword‡†";
  private $dbNm = "dcrdc";
  protected $dbConn;
  protected $qStr;
  protected $qRes;

  public function __construct() {
    if ( $this-> $dbUsrNm == "abc†‡actualUserName‡†xyz" && $dbUsrPwd == "abc†‡actualPassword‡†xyz" ) {
      RepFatalErr( "I am seeing that the details for accessing the website's database were never specified after cloning the project." );
    }
    $this->dbConn = new mysqli( $this->dbSvrNm, $this->dbUsrNm, $this->dbUsrPwd, $this->dbNm );
    if ( $this->dbConn->connect_error ) {
      RepFatalErr( "An attempt to connect to the database failed. The error message was: " . $this->dbConn->connect_error);
    }
  }

  public function __destruct() {
    $this->dbConn->close();
  }

  public function RunQuery( $qStr ) {
    // Only run approved queries.
    if( !$this->IsQStrValid( $qStr ) ) {
      $this->RepFatalErr( 'I am rejecting an attempt to run a query using an unapproved syntax pattern.' );
    }

    // The query string passed inspection, so go ahead and run it.
    $this->qStr = $qStr;
    $this->qRes = $this->dbConn->query( $this->qStr );
    if ( $this->dbConn->error ) {
      RepFatalErr( $this->dbConn->error );
    }
    return $this->qRes;
  }

  protected function RepFatalErr( $msg = NULL ) {
    if ( $msg == NULL ) {
      $msg = "An unclassified error was reported.";
    }
    $finalMsg = "Fatal database error: " . $msg . " Consequently, I am aborting my attempt to set up the requested page.";
    die( $finalMsg );
  }

  protected function IsQStrValid( $qStr ) {
    // $ptrn = "/SELECT (?:`.+?`|\*) FROM (?:`.+?`) WHERE (?:`.+?` ?(?:=|>|<|>=|<=|<>) ?(?:[01]|'.+?'))(?:(?: ?AND ?| ?OR ?)(?:`.+?`(?:=|>|<|>=|<=|<>)(?:[01]|'.+?')))*/Ai";
    $ptrn = "/SELECT.+?FROM.+?WHERE.+/Ai";
    $validity = preg_match( $ptrn, $qStr );
    return $validity;
  }
}

?>
