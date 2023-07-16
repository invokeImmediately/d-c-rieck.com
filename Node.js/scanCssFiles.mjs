/*******************************************************************************
 * ▓▓▓▒ ▄▀▀▀ ▄▀▀▀ ▄▀▀▄ ▐▀▀▄ ▄▀▀▀ ▄▀▀▀ ▄▀▀▀ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▓▓▒▒ ▀▀▀█ █    █▄▄█ █  ▐ █    ▀▀▀█ ▀▀▀█ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▓▒▒▒ ▀▀▀   ▀▀▀ █  ▀ ▀  ▐  ▀▀▀ ▀▀▀  ▀▀▀  FilesCLI.mjs ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Node.js module for scanning CSS files for various properties.
 *
 * @author Daniel C. Rieck
 *  <danielcrieck@gmail.com>
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com…
 *  …/blob/main/Node.js/scanCssFile4Sects.js
 *
 * @license MIT, Copyright © 2023 Daniel C. Rieck Permission is hereby granted,
 *  free of charge, to any person obtaining a copy of this software and
 *  associated documentation files (the “Software”), to deal in the Software
 *  without restriction, including without limitation the rights to use, copy,
 *  modify, merge, publish, distribute, sublicense, and/or sell copies of the
 *  Software, and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

import { createRequire } from 'module'
const require = createRequire( import.meta.url );
const fs = require( 'fs' );
const proc = require( 'process' );
const opts = proc.argv.slice( 2 );

function main() {
  // TODO: Better process command line arguments
  // TODO: Add support for additional scanning modes
  // const styleRuleFormat = /^(?!@media)[ \t]*[^{\n]+?\{[^}]+?\}/gm;
  // mediaQueryFormat = new RegExp( "^[ \t]*@media[^{]+\{[^}]+(?:[ \t]*[^{]+{" +
  //   "[^}]+\}[ \t]*[\r\n]*)+[ \t]*}", "gm" );
  // const whiteSpaceFormat = new RegExp( "[ \t\r\n]" );

  const codeSectionIndicatorFormat = /\/\*! —» .+? «— \*\//g;
  scanCssFile( opts[0], codeSectionIndicatorFormat );
}

function printCssFileSects( filePath, cssCode, codeSectionIndicatorFormat ) {
  const matches = cssCode.matchAll( codeSectionIndicatorFormat );
  console.log(
`
-------------------------------------------------------------------------------
Topical code sections found in CSS file:
 ${ filePath }

Based on the following regular expression for code section indicators:
 ${ codeSectionIndicatorFormat }
-------------------------------------------------------------------------------`
  );
  let matchCount = 1;
  for ( const match of matches ) {
    console.log(
`${ match[ 0 ] }`
    );
    matchCount++;
  }
  console.log(
`-------------------------------------------------------------------------------
Total code sections found = ${ matchCount }
`
  );
}

function scanCssFile( filePath, codeSectionIndicatorFormat ) {
  // TODO: Check file type based on CSS extension
  if ( typeof filePath === 'undefined' ) {
    console.error( new ReferenceError(
      'A path to a CSS file to scan must be supplied when invoking this script.'
    ) );
    return;
  }
  fs.readFile( filePath, 'utf8', ( err, data ) => {
    if ( err ) {
      console.error( err );
      return;
    }
    printCssFileSects( filePath, data, codeSectionIndicatorFormat );
  } );
}

main();
