/*!*************************************************************************************************
 * █▀▀▄ ▄▀▀▀ █▀▀▄ █    ▄▀▀▄ ▀▀▀█ █  █ █    ▄▀▀▄ ▄▀▀▄ █▀▀▄ █▀▀▀ █▀▀▄       █ ▄▀▀▀
 * █  █ █    █▄▄▀ █  ▄ █▄▄█  ▄▀  ▀▄▄█ █  ▄ █  █ █▄▄█ █  █ █▀▀  █▄▄▀    ▄  █ ▀▀▀█
 * ▀▀▀   ▀▀▀ ▀  ▀▄▀▀▀  █  ▀ █▄▄▄ ▄▄▄▀ ▀▀▀   ▀▀  █  ▀ ▀▀▀  ▀▀▀▀ ▀  ▀▄ ▀ ▀▄▄█ ▀▀▀ 
 *
 * Object-oriented vanilla ES6 implementation of an lazy image loader. Lazy loading of both image
 *   tags and background images is handled by the module.
 *
 * @version 0.0.0
 *
 * @author Daniel C. Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/master…
 *   …/DcrLazyLoader.js
 * @license MIT - Copyright (c) 2021 Daniel C. Rieck
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the “Software”), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 *     Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

( function () {

"use strict";

class LazyLoadImgsOnPage {
	constructor ( settings ) {
		try {
			// Flag indicating the constructor's arguments were properly formed by the caller.
			let propFormArg = false;

			// Make sure the settings argument is formed as expected.
			if( typeof settings === 'object' &&
				settings.hasOwnProperty( 'browser' ) &&
				settings.hasOwnProperty( 'webPage' ) &&
				settings.hasOwnProperty( 'lazyLoadClass' ) &&
				settings.browser instanceof Window &&
				settings.webPage instanceof Document &&
				typeof settings.lazyLoadClass === 'string' &&
				( !settings.hasOwnProperty( 'timeOutDelay' ) || (
					settings.hasOwnProperty( 'timeOutDelay' ) &&
					typeof settings.timeOutDelay === 'number' &&
				  settings.timeOutDelay >= 4 &&
				  settings.timeOutDelay < 1000
				) )
			) {
				propFormArg = true;
			}

			// If the argument is properly formed, carry forward; otherwise abort construction.
			if ( propFormArg ) {
				this.browser = settings.browser;
				this.webPage = settings.webPage;
				this.lazyClass = settings.lazyLoadClass;
				this.imgQStr = 'img.' + this.lazyClass;
				this.delay4TO = settings.hasOwnProperty( 'timeOutDelay' ) ?
					settings.timeOutDelay :
					20;
				this.lazyLoadThrottleTO = undefined;

				// Now that properties have been set, proceed to setting up lazy loading of images.
				this.SetUpLazyLoading();
			} else {
				throw new TypeError( 'An attempt was made to construct me using an argument that was not'
					+ ' an object containing the properties I need.' );
			}
		} catch ( err ) {
			console.log( err.stack );
		}
	}

	LazyLoad() {
		// Check on whether the timer for lazy loading needs to be throttled.
		if ( this.lazyLoadThrottleTO ) {
			clearTimeout( this.lazyLoadThrottleTO );
		}

		// Once the events that trigger this function have finished, check on whether any of the lazy-
		//   loading images have come into view.
		const inst = this;
		console.log( this );
		this.lazyLoadThrottleTO = setTimeout( function() {
			// Make sure to note the web browser's current scrolling offset.
			const scrollTop = inst.browser.pageYOffset;
			let imgsLoaded = 0;

			// Check each of the lazy-loading images 
			inst.imgs.forEach( function( img ) {
				// If the image has grown into view, load it and remove the lazy loading trigger class.
				if ( img.offsetTop < ( inst.browser.innerHeight * 1.5 + scrollTop ) ) {
					imgsLoaded++;
					img.src = img.dataset.src;
					img.classList.remove( inst.lazyClass );
				}
			} );

			// If any images were loaded, that means our list of lazy-loaded images is outdated; when this
			//   occurs, obtain a fresh list of the web page's lazy-loading images that have yet to come
			//   into the loading area and be processed.
			if ( imgsLoaded ) {
				inst.imgs = inst.webPage.querySelectorAll( inst.imgQStr );
			}

			// Remove event listeners once all the lazy-loading images on the page are processed.
			if ( inst.imgs.length == 0 ) {
				inst.webPage.removeEventListener( 'scroll', inst.lazyLoad );
				inst.browser.removeEventListener( 'resize', inst.lazyLoad );
				inst.browser.removeEventListener( 'orientationChange', inst.lazyLoad );
			}
		}, this.delay4TO );
	}

	SetUpLazyLoading() {
		this.imgs = this.webPage.querySelectorAll( this.imgQStr );
		if ( this.imgs.length ) {
			this.lazyLoadThrottleTO = undefined;
			const inst = this;
			this.webPage.addEventListener( 'scroll', function( event ) {
				inst.LazyLoad();
			} );
			this.browser.addEventListener( 'resize', function( event ) {
				inst.LazyLoad();
			} );
			this.browser.addEventListener( 'orientationChange', function( event ) {
				inst.LazyLoad();
			} );
			this.LazyLoad();
		}
	}
}

document.addEventListener("DOMContentLoaded", function() {
	let lazyLoader = new LazyLoadImgsOnPage( {
		browser: window,
		webPage: document,
		lazyLoadClass: 'lazy-loader',
		timeOutDelay: 4
	} );
} );

} )();
