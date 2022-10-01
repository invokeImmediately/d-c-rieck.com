(function (iife) {
  "use strict";

  let adjMnkyIntf = undefined;

  //////////////////
  // § Provide a message logging interface
  function logAdjMnkyMsg(msg, ...subst) {
    console.log(iife.scriptNm + " —» " + msg, ...subst);
  }

  //////////////////
  // § Set up triggering hotkey for activation of the Adjuster Monkey UI

  function chk4AdjMnkyHotKey(evt) {
    if (evt.key == iife.scriptHotKey && evt.ctrlKey && evt.altKey) {
      logAdjMnkyMsg("My UI has been triggered.");
      toggleAdjMnkyIntf();
    }
  }

  function toggleAdjMnkyIntf() {
    if (adjMnkyIntf === undefined) {
      addAdjMnkyRootEl();
      loadReactViaCDN();
    }
  }

  //////////////////
  // § Add the root element for the Adjuster Monkey interface to the DOM

  function addAdjMnkyRootEl() {
    adjMnkyIntf = document.createElement("div");
    adjMnkyIntf.id = iife.adjMnkyRootElId;
    adjMnkyIntf.className = iife.adjMnkyBlkClass;
    document.body.appendChild(adjMnkyIntf);
  }

  //////////////////
  // § When triggered, ensure React modules are loaded

  function loadReactViaCDN() {
    logAdjMnkyMsg("Now checking for the presence of React.");
    if (
      typeof React !== "undefined" ||
      document.getElementById(iife.reactElId) !== null
    ) {
      reportReactPresent();
      loadReactDOMViaCDN();
      return;
    }
    addScriptToBodyTag(
      iife.reactElId,
      true,
      reportReactLoadedByCDN,
      iife.cdnSrc4React
    );
  }

  function reportReactPresent() {
    logAdjMnkyMsg("I see that ReactJS is already present.");
  }

  function addScriptToBodyTag(elId, isCo, olCb, srcUrl) {
    const newScript = document.createElement("script");
    newScript.setAttribute("id", elId);
    if (isCo) {
      newScript.setAttribute("crossorigin", "");
    }
    newScript.onload = olCb;
    newScript.setAttribute("src", srcUrl);
    document.body.append(newScript);
  }

  function reportReactLoadedByCDN() {
    logAdjMnkyMsg("React was not found, so I loaded it via CDN.");
    loadReactDOMViaCDN();
  }

  function loadReactDOMViaCDN() {
    logAdjMnkyMsg("Now checking for the presence of ReactDOM.");
    if (
      typeof ReactDOM !== "undefined" ||
      document.getElementById(iife.reactDOMElId) !== null
    ) {
      reportReactDOMPresent();
      loadAdjMnkyIntfByExtHost();
      // TODO: doNextThing( … );
      return;
    }
    addScriptToBodyTag(
      iife.reactDOMElId,
      true,
      reportReactDOMLoadedByCDN,
      iife.cdnSrc4ReactDOM
    );
  }

  function reportReactDOMPresent() {
    logAdjMnkyMsg("I see that ReactDOM is already present.");
  }

  function reportReactDOMLoadedByCDN() {
    logAdjMnkyMsg("ReactDOM was not found, so I loaded it via CDN.");
    loadAdjMnkyIntfByExtHost();
    // TODO: doNextThing( … );
  }

  //////////////////
  // § When triggered, load the AdjusterMonkey interface

  function loadAdjMnkyIntfByExtHost() {
    logAdjMnkyMsg("Now that React is present, I will load my interface.");
    addScriptToBodyTag(
      iife.adjMnkyJsId,
      true,
      reportAdjMnkyJsLoadedByExtHost,
      iife.extHostSrc4AdjMnkyIntf
    );
  }

  function reportAdjMnkyJsLoadedByExtHost() {
    logAdjMnkyMsg("My interface is now loaded.");
  }

  //////////////////
  // § Begin execution by adding a window load event handler.

  function respToPgLoad(evt) {
    window.addEventListener("keydown", chk4AdjMnkyHotKey);
  }

  window.addEventListener("load", respToPgLoad);
})({
  // scriptNm: string ↓
  scriptNm: "AdjusterMonkey.js",

  // scriptHotKey: string ↓
  scriptHotKey: "j",

  // reactElId: string ↓
  reactElId: "react-src-code",

  // cdnSrc4React: string ↓
  cdnSrc4React: "https://unpkg.com/react@18/umd/react.production.min.js",

  // reactDOMElId: string ↓
  reactDOMElId: "reactdom-src-code",

  // cdnSrc4ReactDOM: string ↓
  cdnSrc4ReactDOM:
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",

  // adjMnkyJsId ↓
  adjMnkyJsId: "adj-mnky-intf-src",

  // extHostSrc4AdjMnkyIntf ↓
  extHostSrc4AdjMnkyIntf:
    "https://d-c-rieck.com/dist/adjmnky-wjb1y05v/AdjMnkyIntf.js",

  // adjMnkyRootElId ↓
  adjMnkyRootElId: "dcrdc-adjmnky-cHXlHx1Q",

  // adjMnkyBlkClass ↓
  adjMnkyBlkClass: "adjmnky",
});
