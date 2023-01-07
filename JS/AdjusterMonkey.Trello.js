// ==UserScript==
// @name         AdjusterMonkey: Trello
// @namespace    http://tampermonkey.net/
// @version      0.4
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
 * @version 0.4.0
 *
 * @author Daniel C. Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/d-c-rieck.com/blob/main/JS/AdjusterMonkey.Trello.js
 * @license MIT - Copyright (c) 2023 Daniel C. Rieck
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

( function( iifeSettings ) {
  'use strict';

  console.log( 'AdjusterMonkey Script for enhancing Trello has loaded.' );

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

  function enhanceTrello() {
    setupListWidening();
    setupKanbanSubBoards();
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

  function monitorTrelloLocation() {
    console.log( 'AdjusterMonkey is now monitoring the location of the Trello web app.' );
    let currentLocation = document.location.href;
    const contentContainer = document.querySelector( '#content' );
    let timer1Id = null;
    let timer2Id = null;
    const observer = new MutationObserver( ( mutations ) => {
      mutations.forEach( ( mutation ) => {
        if ( currentLocation == document.location.href ) {
          return;
        }
        currentLocation = document.location.href;
        if ( timer1Id !== null ) {
          window.clearTimeout( timer1Id );
          console.log( 'Clearing timer %s.', timer1Id );
          timer1Id = null;
        }
        timer1Id = window.setTimeout( enhanceTrello, 1000 );
        if ( timer2Id !== null ) {
          window.clearTimeout( timer2Id );
          console.log( 'Clearing timer %s.', timer2Id );
          timer2Id = null;
        }
        timer2Id = window.setTimeout( monitorBoard, 1000 );
      } );
    } );
    const cfg = {
      childList: true,
    };
    observer.observe( contentContainer, cfg);
  }

  function setupKanbanSubBoards() {
    console.log( 'AdjusterMonkey is setting up Kanban sub-boards.' );
    const cardLists = document.querySelectorAll( '.js-list' );
    const upcomingRegEx = /Upcoming §.+ Tasks/;
    const inProgressRegEx = /In Progress §.+ Tasks/;
    const completedRegEx = /Completed §.+ Tasks/;
    cardLists.forEach( ( cardList ) => {
      cardList.classList.remove( 'kanban-sub-board', 'kanban-sub-board--alt', 'kanban-sub-board--left', 'kanban-sub-board--middle', 'kanban-sub-board--right' );
      const listHeading = cardList.querySelector( '.list-header-name-assist' ).textContent;
      if( listHeading.match( upcomingRegEx ) ) {
        cardList.classList.add( 'kanban-sub-board', 'kanban-sub-board--left' );
      } else if ( listHeading.match( inProgressRegEx ) ) {
        cardList.classList.add( 'kanban-sub-board', 'kanban-sub-board--middle' );
      } else if ( listHeading.match( completedRegEx ) ) {
        cardList.classList.add( 'kanban-sub-board', 'kanban-sub-board--right' );
      }
      const prevCardList = cardList.previousElementSibling;
      const prevListHeading = prevCardList !== null ? prevCardList.querySelector( '.list-header-name-assist' ).textContent : null;
      const prevListIsKanbanSubBoard = prevCardList !== null && prevCardList.classList.contains( 'kanban-sub-board' );
      if ( prevListIsKanbanSubBoard && prevListHeading.match( /Completed §.+ Tasks/ ) && !prevCardList.classList.contains( 'kanban-sub-board--alt' )) {
        cardList.classList.add( 'kanban-sub-board--alt' );
      }
      const prevListIsAltKanbanSubBoard = prevCardList !== null && prevCardList.classList.contains( 'kanban-sub-board--alt' );
      if ( prevListIsAltKanbanSubBoard && ( prevListHeading.match( upcomingRegEx ) || prevListHeading.match( inProgressRegEx ) ) ) {
        cardList.classList.add( 'kanban-sub-board--alt' );
      }
    } );
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

  function shouldClickWidenList( cardList, event ) {
    const listRect = cardList.getBoundingClientRect();
    const triggerLeft = listRect.left + iifeSettings.cardListPadding;
    const triggerRight = listRect.right - iifeSettings.cardListPadding;
    return event.pageX <= triggerLeft || event.pageX >= triggerRight;
  }

  function widenNewList( cardList ) {
    const otherCardLists = document.querySelectorAll( '.js-list' );
    otherCardLists.forEach( ( otherList ) => {
      otherList.classList.remove( "js-list--1xl-wide", "js-list--2xl-wide", "js-list--3xl-wide" );
    } );
    cardList.classList.add( "js-list--1xl-wide" );
  }

  window.addEventListener( 'load', ( event ) => {
    monitorTrelloLocation();
    window.setTimeout( enhanceTrello, 250 );
    window.setTimeout( monitorBoard, 250 );
  } );
} )( {
  cardListPadding: 10,
} );
