/**=================================================================================================
 * ▄▀▀▄ █▀▀▄    █ █  █ ▄▀▀▀▐▀█▀▌█▀▀▀ █▀▀▄ ▐▀▄▀▌▄▀▀▄ ▐▀▀▄ █ ▄▀ █▀▀▀ █  █   ▐▀█▀▌▄▀▀▀
 * █▄▄█ █  █ ▄  █ █  █ ▀▀▀█  █  █▀▀  █▄▄▀ █ ▀ ▌█  █ █  ▐ █▀▄  █▀▀  ▀▄▄█     █  ▀▀▀█
 * █  ▀ ▀▀▀  ▀▄▄█  ▀▀  ▀▀▀   █  ▀▀▀▀ ▀  ▀▄█   ▀ ▀▀  ▀  ▐ ▀  ▀▄▀▀▀▀ ▄▄▄▀ ▀   █  ▀▀▀
 *
 * Userscript designed for use with the TamperMonkey web browser extension that implements a
 *   contextual, adaptable user interface for adjusting web browsing experiences.
 *
 * @version 0.0.0
 * @author Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/TS/TamperMonkey/AdjusterMonkey
 *   .ts
 * @license MIT Copyright (c) 2022 Daniel C. Rieck.
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the "Software"), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
 *     the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * =================================================================================================
 */

// Is this workable/necessary? Probably just need to update the tsconfig w/ @types/react.
// import React from 'react';

( function(
      scriptNm: string,
      reactElId: string,
      cdnSrc4React: string,
      reactDOMElId: string,
      cdnSrc4ReactDOM: string,
) {
  'use strict';

  //////////////////
  // § Provide a message logging interface
  function logAdjMnkyMsg( msg: string, ...subst: any[] ) {
    console.log( scriptNm + ' —» ' + msg, subst );
  }

  //////////////////
  // § Ensure React modules are loaded

  function addScriptToBodyTag( elId: string, isCo: boolean, olCb: any, srcUrl: string ) {
    const newScript: HTMLElement = document.createElement( 'script' );
    newScript.setAttribute( 'id', elId );
    if ( isCo ) {
        newScript.setAttribute( 'crossorigin', '' );
    }
    newScript.onload = olCb;
    newScript.setAttribute( 'src', srcUrl );
    document.body.append( newScript );
  }

  function loadReactViaCDN() {
    logAdjMnkyMsg( 'Now checking for the presence of React.' );
    if ( typeof React !== 'undefined' || document.getElementById( reactElId ) !== null  ) {
      reportReactPresent();
      loadReactDOMViaCDN();
      return;
    }
    addScriptToBodyTag( reactElId, true, reportReactLoadedByCDN, cdnSrc4React );
  }

  function reportReactPresent() {
    logAdjMnkyMsg( 'I see that ReactJS is already present.' );
  }

  function reportReactLoadedByCDN() {
    logAdjMnkyMsg( 'React was not found, so I loaded it via CDN.' );
    loadReactDOMViaCDN();
  }

  function loadReactDOMViaCDN() {
    logAdjMnkyMsg( 'Now checking for the presence of ReactDOM.' );
    if ( typeof ReactDOM !== 'undefined' || document.getElementById( reactDOMElId ) !== null ) {
      reportReactDOMPresent();
      // TODO: doNextThing( … );
      return;
    }
    addScriptToBodyTag( reactDOMElId, true, reportReactDOMLoadedByCDN, cdnSrc4ReactDOM );
  }

  function reportReactDOMPresent() {
    logAdjMnkyMsg( 'I see that ReactDOM is already present.' );
  }

  function reportReactDOMLoadedByCDN() {
    logAdjMnkyMsg( 'ReactDOM was not found, so I loaded it via CDN.' );
      // TODO: doNextThing( … );
  }

  //////////////////
  // § Begin execution by ensuring necessary React modules are loaded
  loadReactViaCDN();
} )(

  // scriptNm: string ↓
  'AdjusterMonkey.js',

  // reactElId: string ↓
  'react-src-code',

  // cdnSrc4React: string ↓  
  'https://unpkg.com/react@18/umd/react.production.min.js',

  // reactDOMElId: string ↓
  'reactdom-src-code',

  // cdnSrc4ReactDOM: string ↓  
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
);
