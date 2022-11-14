import { createRequire } from 'module'
const require = createRequire(import.meta.url);
import clipboard from 'clipboardy';
const proc = require( 'process' );
const txtToArtIntf = require( './txtToAsciiArt.js' );
const valInst = "«print», «copy» (or aliases «cb» and «clipboard»), «prependToFile» (or alias «file»), and «test»."

function printCLIHelp() {
  console.log( `⸿ txtToAsciiArtCLI.js —» Node.js project that generates ASCII art based on a simple text string using the personal alphabet of Daniel C. Rieck.
Command line arguments accepted by this script are as follows:
  [ 0 ]: Simple text string to be converted.
  [ 1 ]: An instructions for what to do with the generated art. Valid instructions are ${valInst}.` );
}

function processCLArgs( procArgs ) {
  const opts = procArgs.slice( 2 );
  if ( opts.length < 1 ) {
    opts[ 1 ] = "help";
  } else if ( opts.length < 2 ) {
    opts[ 1 ] = "print";
  } else if ( !opts[ 1 ].match( /^print|cb|clipboard|copy|test$/ ) ) {
    throw new ReferenceError( `I do not recognize the instruction "${opts[ 1 ]}" for what to do with the ASCII art I am generating. Valid instructions are ${valInst}.` );
  }
  return opts;
}

function convertCLToAsciiArt( cLTxt ) {
  const generator = new txtToArtIntf.AsciiArtGenerator();
  return generator.getArtFromTxt( cLTxt );
}

function printArt( art ) {
  console.log( art );
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

async function main() {
  const opts = processCLArgs( proc.argv );
  switch( opts[ 1 ] ) {
  case "cb":
  case "clipboard":
  case "copy":
    const art = convertCLToAsciiArt( opts[0] );
    clipboard.writeSync( art );
    break;
  case "help":
    printCLIHelp();
    break;
  case "prependToFile":
  case "file":
    prependToFile( opts[0] );
    break;
  case "test":
    testPrintArtHist();
    break;
  case "print":
    const art = convertCLToAsciiArt( opts[0] );
    printArt( art );
    break;
  }
}

main();
