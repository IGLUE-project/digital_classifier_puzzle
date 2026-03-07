import React, { useContext } from 'react';
import Modal from 'react-modal';
import { GlobalContext } from "./GlobalContext";

const customStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //margin: "5vh 5vw",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
};
Modal.setAppElement('#root');

export default function ModalStart(props) {
    const { appSettings, I18n } = useContext(GlobalContext);

    return (
      <Modal  className="modal_content" isOpen={props.showModal} onRequestClose={props.closeModal} style={customStyles} >

        <div className="modal_info">
          <h2>{appSettings.modalheader}</h2>
          <p>{appSettings.modalcontent}</p>

        </div>
        <div className="instructions">
          <h4>{appSettings.modalinstructions0}</h4>
          <div className="step_one">
            <p>{appSettings.modalinstructions1}</p>
            <div className="buttons_selections">
              <button className="buttonno">{appSettings.button_ok}</button>
              <button className="buttonyes">{appSettings.button_nok}</button>
            </div>
          </div>
          <div className="step_two">
          <p>{appSettings.modalinstructions2}</p>
            <div className="button_submit">
              <button className="buttonsubmit">
                <svg viewBox="0 0 25 23">
                  <path d="M20.214 12.041l-1.212 1.213 2.213 2.216h-7a3.429 3.429 0 100 6.857h1.714v-1.714h-1.715a1.714 1.714 0 110-3.429h7l-2.213 2.218 1.213 1.21 4.286-4.285-4.286-4.286z"/>
                  <path d="M7.357 15.47H2.214L2.212 2.532l9.8 6.786a.857.857 0 00.976 0l9.798-6.782v7.791H24.5V1.756A1.716 1.716 0 0022.786.042H2.214A1.714 1.714 0 00.5 1.753V15.47a1.717 1.717 0 001.714 1.714h5.143V15.47zM20.9 1.756L12.5 7.57 4.1 1.756h16.8z"/>
                </svg>
                {appSettings.send}
              </button>
            </div>
          </div>
        </div>
        <div className="continue">
          <button onClick={props.closeModal}>{I18n.getTrans("i.continue")}</button>
        </div>

        <div className="close_modal" onClick={props.closeModal}>
          <svg className="close_modal_icon" viewBox="0 0 14 14">
            <path d="M7.94 7l5.527-5.527a.667.667 0 00-.94-.94L7 6.06 1.473.527a.67.67 0 00-.946.946L6.06 7 .527 12.527a.667.667 0 10.94.94L7 7.94l5.527 5.527a.667.667 0 00.94-.94L7.94 7z"/>
          </svg>
        </div>
      </Modal>);
}