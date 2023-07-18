/*******************************************************************************
 * ▓▓▓▒ ▄▀▀▀ ▄▀▀▀ ▄▀▀▄ ▐▀▀▄ ▄▀▀▀ ▄▀▀▀ ▄▀▀▀ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▓▓▒▒ ▀▀▀█ █    █▄▄█ █  ▐ █    ▀▀▀█ ▀▀▀█ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▓▒▒▒ ▀▀▀   ▀▀▀ █  ▀ ▀  ▐  ▀▀▀ ▀▀▀  ▀▀▀  Files.mjs ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Node.js utility module for scanning CSS files for various characteristics.
 *
 * @version 0.0.0
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

// Import module dependencies.
import { createRequire } from 'module'
const require = createRequire( import.meta.url );
const fs = require( 'fs' );
const proc = require( 'process' );

// Specify global settings.
const moduleIntro = '⸿ scanCssFiles.mjs —» ( Node.js utility that scans local ' +
  'or remote CSS files for\n various characteristics. )';
const scanCommands = {
  desc6n: `help
          file/url code sections
          file/url contents
          file/url selector list`,
  regex: new RegExp( '^(?:\\?|h(?:elp)?|' +
    '(?:(?:file ?|url ?)?code ?sections)|' +
    '(?:(?:file ?|url ?)?contents)|' +
    '(?:(?:file ?|url ?)?selector ?list))$', 'i' ),
}

function executeCommand( opt3s ) {
  switch( opt3s[ 0 ] ) {
  case 'fileCodeSections':
    const codeSectionIndicatorFormat = /\/\*! —» .+? «— \*\//g;
    scanCssFile( opt3s[ 1 ], codeSectionIndicatorFormat );
    break;
  case 'help':
  default:
    printCliHelp();
  }
}

function filterScanCommand( command ) {
  if( command.match( /^(?:\?|h(?:elp)?)$/i ) ) {
    command = 'help';
  } else if( command.match( /^(?:file ?)?code ?sections$/i ) ) {
    command = 'fileCodeSections';
  } else if( command.match( /^url ?code ?sections$/i ) ) {
    command = 'urlCodeSections';
  } else if( command.match( /^(?:file ?)?contents$/i ) ) {
    command = 'fileContents';
  } else if( command.match( /^url ?contents$/i ) ) {
    command = 'urlContents';
  } else if( command.match( /^(?:file ?)?selector ?list$/i ) ) {
    command = 'fileSelectorList';
  } else if( command.match( /^url ?selector ?list$/i ) ) {
    command = 'urlSelectorList';
  }
  return command;
}

function main() {
  // TODO: Better process command line arguments
  // TODO: Add support for additional scanning modes
  // const styleRuleFormat = /^(?!@media)[ \t]*[^{\n]+?\{[^}]+?\}/gm;
  // mediaQueryFormat = new RegExp( "^[ \t]*@media[^{]+\{[^}]+(?:[ \t]*[^{]+{" +
  //   "[^}]+\}[ \t]*[\r\n]*)+[ \t]*}", "gm" );
  // const whiteSpaceFormat = new RegExp( "[ \t\r\n]" );

  const opt3s = processCLArgs( proc.argv );
  executeCommand( opt3s );
}

function printCliHelp() {
  console.log(
`
${ moduleIntro }

Command line arguments accepted by this script are as follows:
  [ 0 ]: A scanning command. Valid commands are:
          ${scanCommands.desc6n}
  [ 1 ]: Either a path to a local CSS file or a URL to a remote file.
■`
  );
}

function printCssFileSects( filePath, cssCode, codeSectionIndicatorFormat ) {
  const matches = cssCode.matchAll( codeSectionIndicatorFormat );
  console.log(
`
${ moduleIntro }
-------------------------------------------------------------------------------
Topical code sections found in CSS file:
 ${ filePath }

Based on the following regular expression for code section indicators:
 ${ codeSectionIndicatorFormat }
-------------------------------------------------------------------------------`
  );
  let matchCount = 0;
  for ( const match of matches ) {
    console.log(
`${ match[ 0 ] }`
    );
    matchCount++;
  }
  console.log(
`-------------------------------------------------------------------------------
Total code sections found = ${ matchCount }
■`
  );
}

function processCLArgs( procArgs ) {
  const opt3s = procArgs.slice( 2 );

  // Process the required command line argument for the scan command.
  if( opt3s.length < 1 ) {
    opt3s[ 0 ] = "help";
  } else if( !opt3s[ 0 ].match( scanCommands.regex ) ) {
    throw new ReferenceError(
`
${ moduleIntro }

Error: I do not recognize the scan command:
          "${ opt3s[ 0 ] }"
Valid commands are:
          ${ scanCommands.desc6n }.
■`
    );
  } else {
    opt3s[ 0 ] = filterScanCommand( opt3s[ 0 ] );
  }

  // Process the file or url to the CSS file that will be scanned.
  if( opt3s[ 0 ] !== 'help' && opt3s.length < 2 ) {
    throw new ReferenceError(
`
${ moduleIntro }

Error: I do not recognize the scan command:
          "${ opt3s[ 0 ] }"
Valid commands are:
          ${ scanCommands.desc6n }.
■`
    );
  }
  if( opt3s.length <= 2 ) {
  }

  return opt3s;
  // ·> Next, begin processing optional command line arguments starting with the
  // ·  flag that indicates whether the art should be wrapped in a comment
  // ·  block. <·
  if( opt3s.length >= 3 && !opt3s[ 2 ].match( /^false|true$/ ) ) {
    throw new ReferenceError(
`I do not recognize the flag:
  "${opt3s[ 2 ]}"
for indicating whether the generated art should be wrapped in a JavaScript style
comment block. A valid flag is either «true» or «false».` );
  } else if( opt3s.length >= 3 ) {
    opt3s[ 2 ] = opt3s[ 2 ] === 'true';
  }

  // Process optional CL argument for the maximum line length.
  if( opt3s.length >= 4 && !opt3s[ 3 ].match( /^[0-9]+$/ ) ) {
    throw new ReferenceError(
`I do not recognize the maximum line length value of:
  "${opt3s[ 3 ]}"
for constraining generation of the ASCII art. Only an integer value will be
accepted.` );
  }

  // Process optional CL argument for newline character format.
  if( opt3s.length >= 5 && !opt3s[ 4 ].match( /^r$|^n$|^rn$/ ) ) {
    throw new ReferenceError(
`I do not recognize the newline format of:
  "${opt3s[ 4 ]}"
The only accepted values are «r», «n», or «rn».` );
  }

  // TODO: Test additional options
  // TODO: Handle case of what happens with different option combinations

  return opt3s;
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
