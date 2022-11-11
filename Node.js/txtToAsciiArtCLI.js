const proc = require( 'process' );
const opts = proc.argv.slice( 2 );
const txtToArtIntf = require( './txtToAsciiArt.js' );

function convertCLToAsciiArt( cLTxt ) {
  // Get the global object referencing the script's ASCII art converter
  const generator = new txtToArtIntf.AsciiArtGenerator();
  console.log( generator.getArtFromTxt( cLTxt ) );
}

convertCLToAsciiArt( opts[0] );
