import React, { useContext } from 'react';
import { useState } from "react";
import { GlobalContext } from "./GlobalContext";


export default function MainScreen(props) {
    const { appSettings, I18n } = useContext(GlobalContext);

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const handleTouchEnd = (e) => {
        if (touchStart - touchEnd > 150) {
            props.right();
        }
        if (touchStart - touchEnd < -150) {
            props.left();
        }
    }

    let selectedClassname = "";
    let trueSelected= "";
    let falseSelected= "";
    let item = props.news[props.newsIndex];
    let numberselected = props.news.filter(item => item.answer === true).length;
    let numberdiscarded = props.news.filter(item => item.answer === false).length;
    let buttonsubmitdisabled = numberdiscarded + numberselected < props.news.length;
    let buttonleftdisabled = props.newsIndex === 0;
    let buttonrightdisabled = props.newsIndex === props.news.length - 1;

    if(props.passed){
      numberselected = props.news.filter(item => item.true_or_false === true).length;
      numberdiscarded = props.news.filter(item => item.true_or_false === false).length;
    }

    if(/*(props.passed && item.true_or_false===false) || */(item.answer !== undefined && item.answer === false)){
      selectedClassname = "selected";
      falseSelected = "false_selected";
    } else if(/*(props.passed && item.true_or_false===true) || */ item.answer !== undefined && item.answer === true){
      selectedClassname = "discarded";
      trueSelected = "true_selected";;
    }

    const submitClick = () => {
      if(buttonsubmitdisabled){
        return;
      } else {
        props.submit();
      }
    }

    return (
      <div className="App">
        <div className="full_content" onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()}>
          <button className={"buttonleft " + (buttonleftdisabled ? "buttondisabled":"buttonenabled")} onClick={()=>props.left()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M20 0H0v20h20zm-7.354 14.166-1.389 1.439-5.737-5.529 5.729-5.657 1.4 1.424-4.267 4.215z"/></svg>
					</button>
          <div className={'content ' + selectedClassname } style={{flex: 1}} >
              {item.iframe ? <iframe id="fakeiframe" src={item.path} style={{flex: 1}}/>:<img src={item.path} alt=""/>}
          </div>
          <button className={"buttonright " + (buttonrightdisabled ? "buttondisabled":"buttonenabled")} onClick={()=>props.right()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M20 0H0v20h20zM7.658 15.707l-1.414-1.414L10.537 10 6.244 5.707l1.414-1.414L13.365 10z"/></svg>
					</button>
        </div>

        <div className='footer'>
          <div className="information">
            <button className="buttoninfo" onClick={()=>props.openModalStart()}>
              <svg viewBox="0 0 22 22">
                <path fillRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm-.5 5a1 1 0 000 2h.5a1 1 0 100-2h-.5zM9 9a1 1 0 000 2h1v3H9a1 1 0 100 2h4a1 1 0 000-2h-1v-4a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>

          <div className="selection_buttons">
            <button className={'buttonno ' + trueSelected } onClick={()=>props.istrue()}>
            {appSettings.button_ok}
            </button>
            <button className={'buttonyes ' + falseSelected } onClick={()=>props.isfalse()}>
            {appSettings.button_nok}
            </button>
          </div>

          <div className="submit">
            {!props.passed ?
            <button className={"buttonsubmit " + (buttonsubmitdisabled ? "buttondisabled":"buttonenabled")}  onClick={submitClick}>
              <p className="send_warning">{appSettings.send_disabled}</p>
              <svg viewBox="0 0 25 23">
                <path d="M20.214 12.041l-1.212 1.213 2.213 2.216h-7a3.429 3.429 0 100 6.857h1.714v-1.714h-1.715a1.714 1.714 0 110-3.429h7l-2.213 2.218 1.213 1.21 4.286-4.285-4.286-4.286z"/>
                <path d="M7.357 15.47H2.214L2.212 2.532l9.8 6.786a.857.857 0 00.976 0l9.798-6.782v7.791H24.5V1.756A1.716 1.716 0 0022.786.042H2.214A1.714 1.714 0 00.5 1.753V15.47a1.717 1.717 0 001.714 1.714h5.143V15.47zM20.9 1.756L12.5 7.57 4.1 1.756h16.8z"/>
              </svg>
              {appSettings.sendText}
            </button>:
            <button className="buttonsubmit buttonenabled"  onClick={props.openModalEnd}>
              <svg viewBox="0 0 25 23">
                <path d="M20.214 12.041l-1.212 1.213 2.213 2.216h-7a3.429 3.429 0 100 6.857h1.714v-1.714h-1.715a1.714 1.714 0 110-3.429h7l-2.213 2.218 1.213 1.21 4.286-4.285-4.286-4.286z"/>
                <path d="M7.357 15.47H2.214L2.212 2.532l9.8 6.786a.857.857 0 00.976 0l9.798-6.782v7.791H24.5V1.756A1.716 1.716 0 0022.786.042H2.214A1.714 1.714 0 00.5 1.753V15.47a1.717 1.717 0 001.714 1.714h5.143V15.47zM20.9 1.756L12.5 7.57 4.1 1.756h16.8z"/>
              </svg>
              {appSettings.end}
            </button>
            }
          </div>

        </div>
      </div>
    );
  }
