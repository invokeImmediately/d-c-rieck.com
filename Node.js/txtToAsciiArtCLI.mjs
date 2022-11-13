import { createRequire } from 'module'
const require = createRequire(import.meta.url);
import clipboard from 'clipboardy';
const proc = require( 'process' );
const txtToArtIntf = require( './txtToAsciiArt.js' );
const valInst = "«print» and «copy» (or aliases «cb» and «clipboard»)"

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
  } else if ( !opts[ 1 ].match( /^print|cb|clipboard|copy$/ ) ) {
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

async function main() {
  const opts = processCLArgs( proc.argv );
  const art = convertCLToAsciiArt( opts[0] );
  switch( opts[ 1 ] ) {
  case "cb":
  case "clipboard":
  case "copy":
    clipboard.writeSync( art );
    break;
  case "help":
    printCLIHelp();
    break;
  case "print":
    printArt( art );
    break;
  }
}

main();
