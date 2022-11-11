const proc = require( 'process' );
const opts = proc.argv.slice( 2 );
const txtToArtIntf = require( './txtToAsciiArt.js' );

function convertCLToAsciiArt( cLTxt ) {
  // Get the global object referencing the script's ASCII art converter
  const converter = new txtToArtIntf.AsciiArtConverter();
  console.log( converter.convertString( cLTxt ) );
}

convertCLToAsciiArt( opts[0] );
