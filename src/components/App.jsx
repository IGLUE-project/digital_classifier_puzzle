import React from 'react';
import {useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/app.scss';
import ModalStart from "./ModalStart.jsx";
import ModalEnd from "./ModalEnd.jsx";
import MainScreen from './MainScreen.jsx';
import { DEFAULT_APP_SETTINGS, ESCAPP_CLIENT_SETTINGS, MAIN_SCREEN, MESSAGE_SCREEN } from '../constants/constants.jsx';


export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } = useContext(GlobalContext);
  const hasExecutedEscappValidation = useRef(false);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const prevScreen = useRef(screen);
  const solution = useRef(null);
  const [appWidth, setAppWidth] = useState(0);
  const [appHeight, setAppHeight] = useState(0);
  let [showModalStart, setShowModalStart] = useState(true);
  let [showModalEnd, setShowModalEnd] = useState(false);
  let [news, setNews] = useState([]);
  let [newsIndex, setNewsIndex] = useState(0);
  let [passed, setPassed] = useState(false);
  
  useEffect(() => {
    //Init Escapp client
    if(escapp !== null){
      return;
    }
    //Create the Escapp client instance.
    let _escapp = new ESCAPP(ESCAPP_CLIENT_SETTINGS);
    setEscapp(_escapp);
    Utils.log("Escapp client initiated with settings:", _escapp.getSettings());

    //Use the storage feature provided by Escapp client.
    setStorage(_escapp.getStorage());

    //Get app settings provided by the Escapp server.
    let _appSettings = processAppSettings(_escapp.getAppSettings());
    setAppSettings(_appSettings);
    Utils.log("App settings:", _appSettings);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  function processAppSettings(_appSettings){
    if(typeof _appSettings !== "object"){
      _appSettings = {};
    }
    if((typeof _appSettings.skin === "undefined")&&(typeof DEFAULT_APP_SETTINGS.skin === "string")){
      _appSettings.skin = DEFAULT_APP_SETTINGS.skin;
    }


    //Init internacionalization module
    I18n.init(_appSettings);
    setNews(JSON.parse(_appSettings.items || "[]"));
    if(typeof _appSettings.message !== "string"){
      _appSettings.message = I18n.getTrans("i.message");
    }

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    Utils.preloadImages([_appSettings.backgroundMessage]);
    //Utils.preloadAudios([_appSettings.soundBeep,_appSettings.soundNok,_appSettings.soundOk]); //Preload done through HTML audio tags
    //Utils.preloadVideos(["videos/some_video.mp4"]);

    return _appSettings;
  }

  useEffect(() => {
    if (!hasExecutedEscappValidation.current && escapp !== null && appSettings !== null && Storage !== null) {
      hasExecutedEscappValidation.current = true;

      //Register callbacks in Escapp client and validate user.
      escapp.registerCallback("onNewErStateCallback", function(erState){
        try {
          Utils.log("New escape room state received from ESCAPP", erState);
          restoreAppState(erState);
        } catch (e){
          Utils.log("Error in onNewErStateCallback", e);
        }
      });

      escapp.registerCallback("onErRestartCallback", function(erState){
        try {
          Utils.log("Escape Room has been restarted.", erState);
          if(typeof Storage !== "undefined"){
            Storage.removeSetting("state");
          }
        } catch (e){
          Utils.log("Error in onErRestartCallback", e);
        }
      });

      //Validate user. To be valid, a user must be authenticated and a participant of the escape room.
      escapp.validate((success, erState) => {
        try {
          Utils.log("ESCAPP validation", success, erState);
          if(success){
            restoreAppState(erState);
            setLoading(false);
          }
        } catch (e){
          Utils.log("Error in validate callback", e);
        }
      });
    }
  }, [escapp, appSettings, Storage]);

  useEffect(() => {
    if(loading === false){
      handleResize();
    }
  }, [loading]);

  useEffect(() => {
    if(appSettings !== null && appSettings.skin){
      const skinClass = getSkinClass(appSettings.skin);
      document.documentElement.classList.remove('skin-standard', 'skin-retro', 'skin-futuristic');
      document.documentElement.classList.add(skinClass);

      // Set background based on appSettings.background
      applyBackground(appSettings.background, skinClass);
    }
  }, [appSettings]);

  function getSkinClass(skin){
    const skinLower = skin.toLowerCase();
    if(skinLower.includes('futuristic')){
      return 'skin-futuristic';
    } else if(skinLower.includes('retro')){
      return 'skin-retro';
    }
    return 'skin-standard';
  }

  function applyBackground(background, skinClass){
    const html = document.documentElement;

    // Check if background is empty or "NONE" - use skin default
    if(!background || background === "" || background.toUpperCase() === "NONE"){
      // Remove inline style to let CSS handle it based on skin class
      html.style.background = "";
      html.style.backgroundSize = "";
      html.style.backgroundColor = "";
    } else {
      // Use custom background from appSettings, preserving tablet overlay
      // Use import.meta.env.BASE_URL for correct path resolution in production
      const baseUrl = import.meta.env.BASE_URL || './';
      const bgColor = skinClass === 'skin-futuristic' ? '#caf0f8' : '#c8b197';
      let tabletImage = `${baseUrl}images/tablet.png`;
      if(skinClass === 'skin-futuristic'){
        tabletImage = `${baseUrl}images/tablet_futuristic.png`;
      } else if(skinClass === 'skin-retro'){
        tabletImage = `${baseUrl}images/tablet_retro.png`;
      }
      html.style.background = `url("${tabletImage}") center no-repeat, url("${background}") center center no-repeat`;
      html.style.backgroundColor = bgColor;
      html.style.backgroundSize = "contain, cover";
    }
  }

  useEffect(() => {
    if (screen !== prevScreen.current) {
      Utils.log("Screen ha cambiado de", prevScreen.current, "a", screen);
      prevScreen.current = screen;
      saveAppState();
    }
  }, [screen]);

  function handleResize(){
    setAppWidth(window.innerWidth);
    setAppHeight(window.innerHeight);
  }

  function restoreAppState(erState){
    Utils.log("Restore application state based on escape room state:", erState);
    if (escapp.getAllPuzzlesSolved() && (escapp.getSolvedPuzzles().length > 0)){
      //Puzzle already solved
        setShowModalStart(false);
        setPassed(true);
        setShowModalEnd(true);
    } else {
      //Puzzle not solved. Restore app state based on local storage.
      restoreAppStateFromLocalStorage();
    }
  }

  function restoreAppStateFromLocalStorage(){
    if(typeof Storage !== "undefined"){
      let stateToRestore = Storage.getSetting("state");
      if(stateToRestore){
        Utils.log("Restore app state", stateToRestore);
        setScreen(stateToRestore.screen);
        if(typeof stateToRestore.solution === "string"){
          solution.current = stateToRestore.solution;
        }
      }
    }
  }

  function saveAppState(){
    if(typeof Storage !== "undefined"){
      let currentAppState = {screen: screen};
      if(screen === MESSAGE_SCREEN){
        currentAppState.solution = solution.current;
      }
      Utils.log("Save app state in local storage", currentAppState);
      Storage.saveSetting("state",currentAppState);
    }
  }

  const left = () => {
    if(newsIndex > 0){
      setNewsIndex(newsIndex - 1);
    }
  }

  const right = () => {
    if(newsIndex < news.length - 1){
      setNewsIndex(newsIndex + 1);
    }
  }

  const isfalse = () => {
    if(!passed){
      let mynews = JSON.parse(JSON.stringify(news));
      mynews[newsIndex].answer = false;
      setNews(mynews);
    }
  }

  const istrue = () => {
    if(!passed){
      let mynews = JSON.parse(JSON.stringify(news));
      mynews[newsIndex].answer = true;
      setNews(mynews);
    }
  }
  const submit = () => {
    let solution = "";
    news.map(n => {
      if(n.answer===true){
        solution += "1";
      } else if (n.answer===false){
        solution += "0";
      }
    });
    console.log("SOLUTION: " + solution);
    escapp.submitNextPuzzle(solution, {}, function(success, erState){
      if(success){
        setPassed(true);
        setShowModalEnd(true);
      } else {
        setPassed(false);
        setShowModalEnd(true);
      }
    });
  }

  const openModalStart = () => {
    setShowModalStart(true);
  }

  const openModalEnd = () => {
    setShowModalEnd(true);
  }

  const closeModalStart = () => {
    setShowModalStart(false);
  }

  const closeModalEnd = () => {
    setShowModalEnd(false);
  }



  if(loading){
    return <div>LOADING</div> ;
  } else {
    return <>
      <ModalStart showModal={showModalStart} closeModal={closeModalStart} I18n={I18n}/>
      <ModalEnd showModal={showModalEnd} closeModal={closeModalEnd} I18n={I18n} passed={passed} news={news}/>
      <MainScreen passed={passed} news={news} newsIndex={newsIndex} openModalStart={openModalStart} openModalEnd={openModalEnd} left={left} right={right} isfalse={isfalse} istrue={istrue} submit={submit} I18n={I18n}/>
    </>;
  }
}