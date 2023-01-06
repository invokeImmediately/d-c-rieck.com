// ==UserScript==
// @name         AdjusterMonkey: Trello
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Enhance Trello workflows with adjustments to CSS and JS.
// @author       Daniel Rieck <danielcrieck@gmail.com> (https://github.com/invokeImmediately)
// @match        https://trello.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=trello.com
// @grant        none
// @license      MIT
// ==/UserScript==


/*!*************************************************************************************************
 * AdjusterMonkey.▐▀█▀▌█▀▀▄ █▀▀▀ █    █    ▄▀▀▄  · · · · · · · · · · · · · · · · · · · · · · · · · ·
 *  · · · · · · ·   █  █▄▄▀ █▀▀  █  ▄ █  ▄ █  █ · · · · · · · · · · · · · · · · · · · · · · · · · ·
 * · · · · · · · ·  █  ▀  ▀▄▀▀▀▀ ▀▀▀  ▀▀▀   ▀▀ .js · · · · · · · · · · · · · · · · · · · · · · · · ·
 * ·································································································
 * Tampermonkey script designed to enhance Trello workflows with adjustments to CSS and JS.
 *
 * @version 0.3.0
 *
 * @author Daniel C. Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/JS/AdjusterMonkey.Trello.js
 * @license MIT - Copyright (c) 2022 Daniel C. Rieck
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

( function( iifeSettings ) {
  'use strict';

  console.log( 'AdjusterMonkey Script for enhancing Trello has loaded.' );

  function monitorTrelloLocation() {
    console.log( 'AdjusterMonkey is now monitoring the location of the Trello web app.' );
    let currentLocation = document.location.href;
    const contentContainer = document.querySelector( '#content' );
    let timerId = null;
    const observer = new MutationObserver( ( mutations ) => {
      mutations.forEach( ( mutation ) => {
        if ( currentLocation == document.location.href ) {
          return;
        }
        currentLocation = document.location.href;
        if ( timerId !== null ) {
          window.clearTimeout( timerId );
          console.log( 'Clearing timer %s.', timerId );
          timerId = null;
        }
        timerId = window.setTimeout( enhanceTrello, 1000 );
      } );
    } );
    const cfg = {
      childList: true,
    };
    observer.observe( contentContainer, cfg);
  }

  function monitorBoard() {
    console.log( 'AdjusterMonkey is monitoring the board for list changes.' );
    const board = document.querySelector( '#board' );
    let timerId = null;
    const observer = new MutationObserver( ( mutations ) => {
      mutations.forEach( ( mutation ) => {
        console.log( 'Adjuster monkey detected a change to the lists present on the board.' );
        if ( timerId !== null ) {
          window.clearTimeout( timerId );
          console.log( 'Clearing timer %s.', timerId );
          timerId = null;
        }
        timerId = window.setTimeout( enhanceTrello, 1000 );
      } );
    } );
    const observerConfig = {
      childList: true,
    };
    observer.observe( board, observerConfig );
  }

  function enhanceTrello() {
    setupListWidening();
  }

  function cycleWidenedList( cardList ) {
    if ( cardList.classList.contains( "js-list--1xl-wide" ) ) {
      cardList.classList.remove( "js-list--1xl-wide" )
      cardList.classList.add( "js-list--2xl-wide" )
    } else if ( cardList.classList.contains( "js-list--2xl-wide" ) ) {
      cardList.classList.remove( "js-list--2xl-wide" )
      cardList.classList.add( "js-list--3xl-wide" )
    } else if ( cardList.classList.contains( "js-list--3xl-wide" ) ) {
      cardList.classList.remove( "js-list--3xl-wide" )
    }
  }

  function shouldClickWidenList( cardList, event ) {
    const triggerLeft = iifeSettings.cardListPadding;
    const triggerRight = cardList.clientWidth - iifeSettings.cardListPadding;
    return event.offsetX <= triggerLeft || event.offsetX > triggerRight;
  }

  function widenNewList( cardList ) {
    const otherCardLists = document.querySelectorAll( '.js-list' );
    otherCardLists.forEach( ( otherList ) => {
      otherList.classList.remove( "js-list--1xl-wide", "js-list--2xl-wide", "js-list--3xl-wide" );
    } );
    cardList.classList.add( "js-list--1xl-wide" );
  }

  function setupListWidening() {
    console.log( 'AdjusterMonkey is setting up list widening.' );
    const cardLists = document.querySelectorAll( '.js-list' );
    cardLists.forEach( ( cardList ) => {
      if ( cardList.dataset.hasListWidening === 'yes' ) {
        return;
      } else {
        cardList.dataset.hasListWidening = 'yes';
      }
      cardList.addEventListener( 'click', ( event ) => {
        if ( !shouldClickWidenList( cardList, event ) ) {
          return;
        }
        if (
          cardList.classList.contains( "js-list--1xl-wide" ) ||
          cardList.classList.contains( "js-list--2xl-wide" ) ||
          cardList.classList.contains( "js-list--3xl-wide" )
        ) {
          cycleWidenedList( cardList );
        } else {
          widenNewList( cardList );
        }
      } );
    } );
  }

  window.addEventListener( 'load', ( event ) => {
    monitorTrelloLocation();
    window.setTimeout( enhanceTrello, 250 );
    window.setTimeout( monitorBoard, 1000 );
  } );
} )( {
  cardListPadding: 10,
} );
