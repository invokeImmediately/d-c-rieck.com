class AsciiArtLetter3h {
  constructor( row1chars, row2chars, row3chars, spaceRight, spaceLeft = true ) {
    this.rows = [];
    this.rows[ 0 ] = row1chars;
    this.rows[ 1 ] = row2chars;
    this.rows[ 2 ] = row3chars;
    this.spaceRight = spaceRight;
    this.spaceLeft = spaceLeft;
  }
}

class AsciiArtGenerator {
  constructor() {

    // Establish the important settings for our ASCII art alphabet.
    this.alphabet = {};
    this.numArtRows = 3;

    // Build our ASCII art alphabet by specifying: 1) the rows of ASCII characters that represent   ;   each glyph and 2) specifying left and right spacing for each glyph.
    this.alphabet[ "a" ] = new AsciiArtLetter3h( "▄▀▀▄", "█▄▄█", "█  ▀", true );
    this.alphabet[ "b" ] = new AsciiArtLetter3h( "█▀▀▄", "█▀▀▄", "▀▀▀ ", true );
    this.alphabet[ "c" ] = new AsciiArtLetter3h( "▄▀▀▀", "█   ", " ▀▀▀", true );
    this.alphabet[ "d" ] = new AsciiArtLetter3h( "█▀▀▄", "█  █", "▀▀▀ ", true );
    this.alphabet[ "e" ] = new AsciiArtLetter3h( "█▀▀▀", "█▀▀ ", "▀▀▀▀", true );
    this.alphabet[ "f" ] = new AsciiArtLetter3h( "█▀▀▀", "█▀▀▀", "▀   ", true );
    this.alphabet[ "g" ] = new AsciiArtLetter3h( "█▀▀▀", "█ ▀▄", "▀▀▀▀", true );
    this.alphabet[ "h" ] = new AsciiArtLetter3h( "█  █", "█▀▀█", "█  ▀", true );
    this.alphabet[ "i" ] = new AsciiArtLetter3h( "▀█▀", " █ ", "▀▀▀", true );
    this.alphabet[ "j" ] = new AsciiArtLetter3h( "   █", "▄  █", "▀▄▄█", true );
    this.alphabet[ "k" ] = new AsciiArtLetter3h( "█ ▄▀ ", "█▀▄  ", "▀  ▀▄", false );
    this.alphabet[ "l" ] = new AsciiArtLetter3h( "█   ", "█  ▄", "▀▀▀ ", true );
    this.alphabet[ "m" ] = new AsciiArtLetter3h( "▐▀▄▀▌", "█ ▀ ▌", "█   ▀", false );
    this.alphabet[ "n" ] = new AsciiArtLetter3h( "▐▀▀▄", "█  ▐", "▀  ▐", true );
    this.alphabet[ "o" ] = new AsciiArtLetter3h( "▄▀▀▄", "█  █", " ▀▀ ", true );
    this.alphabet[ "p" ] = new AsciiArtLetter3h( "█▀▀▄", "█▄▄▀", "█   ", true );
    this.alphabet[ "q" ] = new AsciiArtLetter3h( "▄▀▀▄", "█  █", " ▀█▄", true );
    this.alphabet[ "r" ] = new AsciiArtLetter3h( "█▀▀▄ ", "█▄▄▀ ", "▀  ▀▄", false );
    this.alphabet[ "s" ] = new AsciiArtLetter3h( "▄▀▀▀", "▀▀▀█", "▀▀▀ ", true );
    this.alphabet[ "t" ] = new AsciiArtLetter3h( "▐▀█▀▌", "  █  ", "  █  ", false, false );
    this.alphabet[ "u" ] = new AsciiArtLetter3h( "█  █", "█  █", " ▀▀ ", true );
    this.alphabet[ "v" ] = new AsciiArtLetter3h( "▐   ▌", " █ █ ", "  █  ", false, false );
    this.alphabet[ "w" ] = new AsciiArtLetter3h( "▐   ▌", "▐ █ ▌", " ▀ ▀ ", false, false );
    this.alphabet[ "x" ] = new AsciiArtLetter3h( "▐▄ ▄▌", "  █  ", "▐▀ ▀▌", false, false );
    this.alphabet[ "y" ] = new AsciiArtLetter3h( "█  █", "▀▄▄█", "▄▄▄▀", true );
    this.alphabet[ "z" ] = new AsciiArtLetter3h( "▀▀▀█", " ▄▀ ", "█▄▄▄", true );
    this.alphabet[ "0" ] = new AsciiArtLetter3h( "█▀▀█", "█▄▀█", "█▄▄█", true );
    this.alphabet[ "1" ] = new AsciiArtLetter3h( "▄█  ", " █  ", "▄█▄▌", true );
    this.alphabet[ "2" ] = new AsciiArtLetter3h( "▄▀▀█", " ▄▄▀", "█▄▄▄", true );
    this.alphabet[ "3" ] = new AsciiArtLetter3h( "█▀▀█", "  ▀▄", "█▄▄█", true );
    this.alphabet[ "4" ] = new AsciiArtLetter3h( " ▄▀█ ", "▐▄▄█▌", "   █ ", false );
    this.alphabet[ "5" ] = new AsciiArtLetter3h( "█▀▀▀", "▀▀▀▄", "▄▄▄▀", true );
    this.alphabet[ "6" ] = new AsciiArtLetter3h( "▄▀▀▄", "█▄▄ ", "▀▄▄▀", true );
    this.alphabet[ "7" ] = new AsciiArtLetter3h( "▐▀▀█", "  █ ", " ▐▌ ", true );
    this.alphabet[ "8" ] = new AsciiArtLetter3h( "▄▀▀▄", "▄▀▀▄", "▀▄▄▀", true );
    this.alphabet[ "9" ] = new AsciiArtLetter3h( "▄▀▀▄", "▀▄▄█", " ▄▄▀", true );
    this.alphabet[ " " ] = new AsciiArtLetter3h( " ", " ", " ", true );
    this.alphabet[ "." ] = new AsciiArtLetter3h( " ", " ", "▀", true );
    this.alphabet[ "," ] = new AsciiArtLetter3h( " ", "▄", "▐", true );
    this.alphabet[ "?" ] = new AsciiArtLetter3h( "▄▀▀█", "  █▀", "  ▄ ", true );
    this.alphabet[ "!" ] = new AsciiArtLetter3h( "█", "█", "▄", true );
    this.alphabet[ ":" ] = new AsciiArtLetter3h( "▄", "▄", " ", true );
    this.alphabet[ ";" ] = new AsciiArtLetter3h( "▄", "▄", "▐", true );
    this.alphabet[ "-" ] = new AsciiArtLetter3h( "  ", "▀▀", "  ", true );
    this.alphabet[ "–" ] = new AsciiArtLetter3h( "   ", "▀▀▀", "   ", true );
    this.alphabet[ "—" ] = new AsciiArtLetter3h( "    ", "▀▀▀▀", "    ", true );
    this.alphabet[ "_" ] = new AsciiArtLetter3h( "   ", "   ", "▀▀▀", true );
    this.alphabet[ "*" ] = new AsciiArtLetter3h( "▀▄█▄▀", " ▄█▄ ", "▀ ▀ ▀", true );
    this.alphabet[ "/" ] = new AsciiArtLetter3h( "  █", " █ ", "█  ", true );
    this.alphabet[ "\\" ] = new AsciiArtLetter3h( "█  ", " █ ", "  █", true );
    this.alphabet[ "(" ] = new AsciiArtLetter3h( "▄▀", "█ ", " ▀", true );
    this.alphabet[ ")" ] = new AsciiArtLetter3h( "▀▄", " █", "▀ ", true );
    this.alphabet[ "[" ] = new AsciiArtLetter3h( "█▀", "█ ", "▀▀", true );
    this.alphabet[ "]" ] = new AsciiArtLetter3h( "▀█", " █", "▀▀", true );
    this.alphabet[ "{" ] = new AsciiArtLetter3h( " █▀", "▀▄ ", " ▀▀", true );
    this.alphabet[ "}" ] = new AsciiArtLetter3h( "▀█ ", " ▄▀", "▀▀ ", true );
  }

  getArtFromTxt( txt, newlines = "rn" ) {

    // Determine how new lines should be encoded
    let nlChars;
    if ( newlines == "r") {
      nlChars = "\r";
    } else if( newlines == "n" ) {
      nlChars = "\n";
    } else {
      nlChars = "\r\n";
    }

    // Loop through each row of the ASCII art that will represent the input string
    let asciiArt = "";
    const len = txt.length;
    let idx_i = 0;
    let whichChar, nextChar, artChars;
    while( idx_i < this.numArtRows ) {

      // For each row of ASCII art, loop through each character that needs to be converted
      let idx_j = 0;
      while( idx_j < len ) {

        // Get the character to be converted at the current columnar position along the current row of ASCII art
        if ( idx_j == 0 ) {
          whichChar = txt.substring( idx_j, idx_j + 1 ).toLowerCase();
        } else {
          whichChar = nextChar;
        }

        // Look ahead for the next character to be converted; this is important for determining spacing between letters
        if ( idx_j < len - 1 ) {
          nextChar = txt.substring( idx_j + 1, idx_j + 2 ).toLowerCase();
        }

        // Now obtain the appropriate row of ASCII art characters that represent the current character being converted
        artChars = this.alphabet[ whichChar ].rows[ idx_i ];

        // If this is the last character in the row, strip off terminl spaces
        if ( idx_j == len - 1 ) {
          artChars = artChars.replace(/ +$/g, "");
        }

        // Add the art characters to the converted string we are building.
        if ( artChars.length > 0 ) {
          asciiArt += artChars;
          if ( idx_j < len - 1 && this.alphabet[ whichChar ].spaceRight
              && this.alphabet[ nextChar ].spaceLeft ) {
            asciiArt += " ";
          }
        }

        // Proceed to the next character in the string to be converted for this row of ASCII art.
        idx_j++;
      }

      // Proceed to building the next row of ASCII art.
      idx_i++;
      if ( idx_i < this.numArtRows ) {
        asciiArt += nlChars;
      }
    }

    // Return the text block of ASCII art constructed from the string supplied to the function
    return asciiArt;
  }
}

module.exports = {
  AsciiArtLetter3h,
  AsciiArtGenerator,
};
