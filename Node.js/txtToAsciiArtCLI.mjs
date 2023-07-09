/*!*****************************************************************************
 * ▓▓▓ txtTo ▄▀▀▄ ▄▀▀▀ ▄▀▀▀ ▀█▀ ▀█▀ ▄▀▀▄ █▀▀▄ ▐▀█▀▌ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▓▓▒▒▒▒▒▒▒ █▄▄█ ▀▀▀█ █     █   █  █▄▄█ █▄▄▀   █   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▓▒▒▒▒▒▒▒▒ █  ▀ ▀▀▀   ▀▀▀ ▀▀▀ ▀▀▀ █  ▀ ▀  ▀▄  █  CLI.js ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Node.js module that implements a command line interface for translating text
 * strings into a personal ASCII art alphabet.
 *
 * List of abbreviations used in the file:
 * - CL(I) = Command Line (Interface)
 *
 * @author Daniel C. Rieck
 *  <danielcrieck@gmail.com>
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com…
 *  …/blob/main/Node.js/txtToAsciiArtCLI.mjs
 *
 * @license MIT, Copyright © 2023 Daniel C. Rieck Permission is hereby granted,
 *  free of charge, to any person obtaining a copy of this software and
 *  associated documentation files (the “Software”), to deal in the Software
 *  without restriction, including without limitation the rights to use, copy,
 *  modify, merge, publish, distribute, sublicense, and/or sell copies of the
 *  Software, and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

import { createRequire } from 'module'
const require = createRequire(import.meta.url);
import clipboard from 'clipboardy';
const proc = require( 'process' );
const txtToArtIntf = require( './txtToAsciiArt.js' );
const validInstructions =
`«print», «copy» (or aliases «cb» and «clipboard»), «prependToFile» (or alias
         «file»), and «test»`;

function convertCLToAsciiArt(
  cLTxt, maxLineLength, wrapInCommentBlock, newlineFormat
) {
  const generator = new txtToArtIntf.AsciiArtGenerator();
  if( wrapInCommentBlock ) {
    maxLineLength -= 3;
  }
  const newlines = generator.getNewLineChars( newlineFormat );
  let art = generator.getArtFromTxt( cLTxt, maxLineLength, newlineFormat );
  if( wrapInCommentBlock ) {
    art = " * " + art;
    const regex = new RegExp( newlines, "g" );
    art = art.replace( regex, newlines + " * " );
    art = "/**" + "*".repeat( maxLineLength ) + newlines + art;
    art += "\r\n " + "*".repeat( maxLineLength - 1 ) + "**/" + newlines;
  }
  return art;
}

function getWrapFlagFromOpt3s( opt3s ) {
  let wrapInCommentBlock = false;
  if( opt3s.length >= 3 ) {
    wrapInCommentBlock = opt3s[ 2 ];
  }
  return wrapInCommentBlock;
}

function getMaxLineLengthFromOpt3s( opt3s ) {
  let maxLineLength = 80;
  if( opt3s.length >= 4 ) {
    maxLineLength = parseInt( opt3s[ 3 ] );
  }
  if( maxLineLength < 40 ) {
    maxLineLength = 40;
  }
  return maxLineLength;
}

function getNewlineFormatFromOpt3s( opt3s ) {
  let newlineFormat = "rn";
  if ( opt3s.length >= 5 ) {
    newlineFormat = opt3s[ 4 ];
  }
  return newlineFormat;
}

async function main() {
  const opt3s = processCLArgs( proc.argv );
  const maxLineLength = getMaxLineLengthFromOpt3s( opt3s );
  const wrapInCommentBlock = getWrapFlagFromOpt3s( opt3s );
  const newlineFormat = getNewlineFormatFromOpt3s( opt3s );
  let art;
  switch( opt3s[ 1 ] ) {
  case "cb":
  case "clipboard":
  case "copy":
    art = convertCLToAsciiArt(
      opt3s[0], maxLineLength, wrapInCommentBlock, newlineFormat
    );
    clipboard.writeSync( art );
    break;
  case "help":
    printCLIHelp();
    break;
  case "prependToFile":
  case "file":
    prependToFile( opt3s[0] );
    break;
  case "test":
    testPrintArtHist();
    break;
  case "print":
    art = convertCLToAsciiArt( opt3s[0], maxLineLength, wrapInCommentBlock );
    printArt( art );
    break;
  }
}

function printArt( art ) {
  console.log( art );
}

function printCLIHelp() {
  console.log(
`⸿ txtToAsciiArtCLI.js —» Node.js project that generates ASCII art based on a
simple text string using the personal alphabet of Daniel C. Rieck.

Command line arguments accepted by this script are as follows:
  [ 0 ]: Simple text string to be converted.
  [ 1 ]: An instruction for what to do with the generated art. Valid
         instructions are ${validInstructions}.
  [ 2 ]: A boolean flag indicating whether the generated ASCII art should be
         wrapped in a JS style comment block. (Optional; default value = false)
  [ 3 ]: Maximum line length to which the generated ASCII art should be
         constrained. (Optional, default value = 80)
  [ 4 ]: Newline character format (Optional, default value = rn; accepted
         values = n, r, rn)` );
}

function processCLArgs( procArgs ) {
  const opt3s = procArgs.slice( 2 );

  // First process required command line arguments.
  if( opt3s.length < 1 ) {
    opt3s[ 1 ] = "help";
  } else if( opt3s.length < 2 ) {
    opt3s[ 1 ] = "print";
  } else if( !opt3s[ 1 ].match( /^cb|clipboard|copy|file|print|test$/ ) ) {
    throw new ReferenceError( `I do not recognize the instruction:
  "${opt3s[ 1 ]}"
for what to do with the ASCII art I am generating. Valid instructions are:
  ${validInstructions}.` );
  }

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

function prependToFile( path, maxLineLen = 80 ) {
  // TODO: Finish writing according to the following parmeters. ··>
  // - This function shall currently be limited to working with CSS and JS files.
  // - Start by testing if a file represented by the path paremeter is present. If not, report an error and cancel further execution.
  // - Open the file with read/write access.
  // - Read the contents of the file.
  // - Use regex to identify if a file header comment is present in the file.
  // - Based on the nature of the existing comment block
  // - Use regex to isolate the file name from the path.
  // - Convert the file name to ASCII art. (Split the name into multiple strings if it is too long to fit in the )
  // - If a header comment is not present, prepend the ASCII art as the new file header comment block.
  // - If a header comment is present, insert the ASCII art at the top of the file header comment block. <··
}

function testPrintArtHist() {
  const generator = new txtToArtIntf.AsciiArtGenerator();
  generator.getArtFromTxt( "This is a test." );
  generator.getArtFromTxt( "Testing 1 2 3." );
  generator.getArtFromTxt( "Testing A B C." );
  generator.getArtFromTxt( "Audio check." );
  generator.printArt( -1 );
  generator.printArt( 1 );
}

main();
