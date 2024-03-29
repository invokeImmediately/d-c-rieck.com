/*!*****************************************************************************
 * ▓▓▓ txtTo ▄▀▀▄ ▄▀▀▀ ▄▀▀▀ ▀█▀ ▀█▀ ▄▀▀▄ █▀▀▄ ▐▀█▀▌ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
 * ▓▓▒▒▒▒▒▒▒ █▄▄█ ▀▀▀█ █     █   █  █▄▄█ █▄▄▀   █   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
 * ▓▒▒▒▒▒▒▒▒ █  ▀ ▀▀▀   ▀▀▀ ▀▀▀ ▀▀▀ █  ▀ ▀  ▀▄  █  .js ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓
 *
 * Node.js module for articulating a personal ASCII art alphabet and
 *  translating text strings into the alphabet.
 *
 * @author Daniel C. Rieck
 *  <danielcrieck@gmail.com>
 *  (https://github.com/invokeImmediately)
 *
 * @link https://github.com/invokeImmediately/d-c-rieck.com…
 *  …/blob/main/Node.js/txtToAsciiArt.js
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
  constructor( loadHist = false ) {

    // Establish the important settings for our ASCII art alphabet.
    this.alphabet = {};
    this.numArtRows = 3;
    this.artHist = [];

    // ·> Build our ASCII art alphabet by specifying: 1) the rows of ASCII
    // ·  characters that represent each glyph and 2) specifying left and right
    // ·  spacing for each glyph. <·
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
    this.alphabet[ "k" ] = new AsciiArtLetter3h( "█ ▄▀ ", "█▀▄  ", "▀  ▀▄",
      false );
    this.alphabet[ "l" ] = new AsciiArtLetter3h( "█   ", "█  ▄", "▀▀▀ ", true );
    this.alphabet[ "m" ] = new AsciiArtLetter3h( "▐▀▄▀▌", "█ ▀ ▌", "█   ▀",
      false );
    this.alphabet[ "n" ] = new AsciiArtLetter3h( "▐▀▀▄", "█  ▐", "▀  ▐", true );
    this.alphabet[ "o" ] = new AsciiArtLetter3h( "▄▀▀▄", "█  █", " ▀▀ ", true );
    this.alphabet[ "p" ] = new AsciiArtLetter3h( "█▀▀▄", "█▄▄▀", "█   ", true );
    this.alphabet[ "q" ] = new AsciiArtLetter3h( "▄▀▀▄", "█  █", " ▀█▄", true );
    this.alphabet[ "r" ] = new AsciiArtLetter3h( "█▀▀▄ ", "█▄▄▀ ", "▀  ▀▄",
      false );
    this.alphabet[ "s" ] = new AsciiArtLetter3h( "▄▀▀▀", "▀▀▀█", "▀▀▀ ", true );
    this.alphabet[ "t" ] = new AsciiArtLetter3h( "▐▀█▀▌", "  █  ", "  █  ",
      false, false );
    this.alphabet[ "u" ] = new AsciiArtLetter3h( "█  █", "█  █", " ▀▀ ", true );
    this.alphabet[ "v" ] = new AsciiArtLetter3h( "▐   ▌", " █ █ ", "  █  ",
      false, false );
    this.alphabet[ "w" ] = new AsciiArtLetter3h( "▐   ▌", "▐ █ ▌", " ▀ ▀ ",
      false, false );
    this.alphabet[ "x" ] = new AsciiArtLetter3h( "▐▄ ▄▌", "  █  ", "▐▀ ▀▌",
      false, false );
    this.alphabet[ "y" ] = new AsciiArtLetter3h( "█  █", "▀▄▄█", "▄▄▄▀", true );
    this.alphabet[ "z" ] = new AsciiArtLetter3h( "▀▀▀█", " ▄▀ ", "█▄▄▄", true );
    this.alphabet[ "0" ] = new AsciiArtLetter3h( "█▀▀█", "█▄▀█", "█▄▄█", true );
    this.alphabet[ "1" ] = new AsciiArtLetter3h( "▄█  ", " █  ", "▄█▄▌", true );
    this.alphabet[ "2" ] = new AsciiArtLetter3h( "▄▀▀█", " ▄▄▀", "█▄▄▄", true );
    this.alphabet[ "3" ] = new AsciiArtLetter3h( "█▀▀█", "  ▀▄", "█▄▄█", true );
    this.alphabet[ "4" ] = new AsciiArtLetter3h( " ▄▀█ ", "▐▄▄█▌", "   █ ",
      false );
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
    this.alphabet[ "*" ] = new AsciiArtLetter3h( "▀▄█▄▀", " ▄█▄ ", "▀ ▀ ▀",
      true );
    this.alphabet[ "/" ] = new AsciiArtLetter3h( "  █", " █ ", "█  ", true );
    this.alphabet[ "\\" ] = new AsciiArtLetter3h( "█  ", " █ ", "  █", true );
    this.alphabet[ "(" ] = new AsciiArtLetter3h( "▄▀", "█ ", " ▀", true );
    this.alphabet[ ")" ] = new AsciiArtLetter3h( "▀▄", " █", "▀ ", true );
    this.alphabet[ "[" ] = new AsciiArtLetter3h( "█▀", "█ ", "▀▀", true );
    this.alphabet[ "]" ] = new AsciiArtLetter3h( "▀█", " █", "▀▀", true );
    this.alphabet[ "{" ] = new AsciiArtLetter3h( " █▀", "▀▄ ", " ▀▀", true );
    this.alphabet[ "}" ] = new AsciiArtLetter3h( "▀█ ", " ▄▀", "▀▀ ", true );
  }

  calcArtLenFromTxt( txt ) {
    let asciiArtLen = 0;
    if ( typeof txt === 'undefined' ) {
      return asciiArtLen;
    }
    const len = txt.length;

    // ·> Based on how the glyphs are designed, only the first row of ASCII art
    // ·  glyphs is needed to determine final line length. <·
    let idx_i = 0;
    let whichChar, nextChar, artCharsLen;

    // ·> Loop through each character in the first row of ASCII art to determine
    // ·  the length of the final string. <·
    let idx_j = 0;
    while( idx_j < len ) {

      // ·> Get the character to be converted at the current columnar position
      // ·  along the current row of ASCII art. <·
      if ( idx_j == 0 ) {
        whichChar = txt.substring( idx_j, idx_j + 1 ).toLowerCase();
      } else {
        whichChar = nextChar;
      }

      // ·> Look ahead for the next character to be converted; this is important
      // ·  for determining spacing between letters. <·
      if ( idx_j < len - 1 ) {
        nextChar = txt.substring( idx_j + 1, idx_j + 2 ).toLowerCase();
      }

      // ·> Now obtain the appropriate row of ASCII art characters that
      // ·  represent the current character being converted. <·
      artCharsLen = this.alphabet[ whichChar ].rows[ idx_i ].length;

      // Add the art characters to the converted string we are building.
      if ( artCharsLen > 0 ) {
        asciiArtLen += artCharsLen;
        if ( idx_j < len - 1 && this.alphabet[ whichChar ].spaceRight
            && this.alphabet[ nextChar ].spaceLeft ) {
          // ·> Add one to length to represent the extra space that is added
          // ·  between most characters. <·
          asciiArtLen += 1;
        }
      }

      // ·> Proceed to the next character in the string to hypothetically be
      // ·  converted to ASCII art. <·
      idx_j++;
    }

    // ·> Return the overall length of the ASCII art that would be generated
    // ·  from the source string. <·
    return asciiArtLen;
  }

  getArtFromTxt( txt, maxLineLen = 80, newlines = "rn" ) {
    let asciiArt = "";
    if ( typeof txt === 'undefined' ) {
      return asciiArt;
    }

    // Ensure line length is sufficiently large
    if ( maxLineLen < 40 ) {
      maxLineLen = 40;
    }

    // Check line length of hypothetical art generation
    const hypArtLen = this.calcArtLenFromTxt( txt );
    if ( hypArtLen > maxLineLen ) {
      asciiArt = this.splitSrcTxtBefArtGen( txt, maxLineLen, newlines );
      return asciiArt;
    }

    const nlChars = this.getNewLineChars( newlines );
    const len = txt.length;
    let idx_i = 0;
    let whichChar, nextChar, artChars;
    while( idx_i < this.numArtRows ) {

      // ·> For each row of ASCII art, loop through each character that needs to
      // ·  be converted. <·
      let idx_j = 0;
      while( idx_j < len ) {

        // ·> Get the character to be converted at the current columnar position
        // ·  along the current row of ASCII art. <·
        if ( idx_j == 0 ) {
          whichChar = txt.substring( idx_j, idx_j + 1 ).toLowerCase();
        } else {
          whichChar = nextChar;
        }

        // ·> Look ahead for the next character to be converted; this is
        // ·  important for determining spacing between letters. <·
        if ( idx_j < len - 1 ) {
          nextChar = txt.substring( idx_j + 1, idx_j + 2 ).toLowerCase();
        }

        // ·> Now obtain the appropriate row of ASCII art characters that
        // ·  represent the current character being converted. <·
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

        // ·> Proceed to the next character in the string to be converted for
        // ·  this row of ASCII art. <·
        idx_j++;
      }

      // Proceed to building the next row of ASCII art.
      idx_i++;
      if ( idx_i < this.numArtRows ) {
        asciiArt += nlChars;
      }
    }

    // ·> Return the text block of ASCII art constructed from the string
    // ·  supplied to the function. <·
    this.artHist.push( [asciiArt, txt, Date.now() ] );
    return asciiArt;
  }

  getAvgArtCharLen() {
    let avgCharLen = 0.0;
    let numChars = 0;
    for( let artChar in this.alphabet ) {
      avgCharLen += this.alphabet[ artChar ].rows[0].length;
      numChars++;
    }
    return  avgCharLen / numChars;
  }

  getNewLineChars( newlines ) {
    let nlChars;
    if ( newlines == "r") {
      nlChars = "\r";
    } else if( newlines == "n" ) {
      nlChars = "\n";
    } else {
      nlChars = "\r\n";
    }
    return nlChars;
  }

  printArt( idx = 0 ) {
    if ( idx == -1 ) {
      console.log( JSON.stringify( this.artHist ) );
    } else {
      console.log( `${this.artHist[ idx ][ 0 ] }
Generated from "${this.artHist[ idx ][ 1 ]}" on ${
  Date( this.artHist[ idx ][ 2 ] ).toString()
}.` );
    }
  }

  splitSrcTxtBefArtGen( txt, maxLineLen, newlines ) {
    // ·> TODO: Add a mode for splitting source string only along whitespace
    // ·  characters? <·
    let asciiArt = "", txtSlice;
    const nlChars = this.getNewLineChars();
    let idx_s = 0;
    let idx_e = idx_s + Math.ceil( maxLineLen / this.getAvgArtCharLen() );
    while ( idx_e < txt.length ) {
      txtSlice = txt.substring( idx_s, idx_e );
      while (
        idx_e > idx_s + 1 && this.calcArtLenFromTxt( txtSlice ) > maxLineLen
      ) {
        idx_e--;
        txtSlice = txt.substring( idx_s, idx_e );
      }
      if ( idx_s > 0 ) {
        asciiArt += nlChars.repeat( 2 );
      }
      asciiArt += this.getArtFromTxt( txtSlice, maxLineLen, newlines );
      idx_s = idx_e;
      idx_e = idx_s + Math.ceil( maxLineLen / this.getAvgArtCharLen() );
    }
    idx_e = txt.length;
    txtSlice = txt.substring( idx_s, idx_e );
    while (
      idx_e > idx_s + 1 && this.calcArtLenFromTxt( txtSlice ) > maxLineLen
    ) {
      idx_e--;
      txtSlice = txt.substring( idx_s, idx_e );
    }
    asciiArt += nlChars.repeat( 2 );
    asciiArt += this.getArtFromTxt( txtSlice, maxLineLen, newlines );
    if ( idx_e < txt.length ) {
      asciiArt += nlChars.repeat( 2 );
      asciiArt += this.getArtFromTxt(
        txt.substring( idx_e, txt.length ), maxLineLen, newlines
      );
    }
    return asciiArt;
  }
}

module.exports = {
  AsciiArtLetter3h,
  AsciiArtGenerator,
};
