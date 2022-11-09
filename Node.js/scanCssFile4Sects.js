const fs = require( 'fs' );
const proc = require( 'process' );
const opts = proc.argv.slice( 2 );
scanCssFile( opts[0] );

function scanCssFile( filePath ) {
  if ( typeof filePath === 'undefined' ) {
    console.error( new ReferenceError( 'A path to a file to scan must be supplied when invoking this script.' ) );
    return;
  }
  fs.readFile( filePath, 'utf8', ( err, data ) => {
    if ( err ) {
      console.error( err );
      return;
    }
    printCssFileSects( data );
  } );
}

function printCssFileSects( cssCode ) {
  const re = /\/\*! —» .+? «— \*\//g;
  const matches = cssCode.matchAll( re );
  console.log( `-----------------------------------------------------------
File sections found in ./wsuwp-wds_cust5r-addl-css-src.css:
-----------------------------------------------------------` );
  for ( const match of matches ) {
    console.log( `${match[0]}` );
  }
}
