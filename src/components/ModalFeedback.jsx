import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5vh 5vw",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
};
Modal.setAppElement('#root');

export default function ModalFeedback(props) {

    return (
      <Modal  className="modal_content" isOpen={props.showModal} onRequestClose={props.closeModal} style={customStyles} >
        <h1>{props.I18n.getTrans("i.feedback")}</h1>
        <div class="outerfeedback">
          <div class="rowfeedback">
            <div class={"itemfeedback " + (props.news[0].true_or_false===true ? "correctfeedback":"wrongfeedback")}><img class="imgfeedback" src={props.news[0].path} alt=""/><h4 class="textfeedback">{props.news[0].feedback}</h4></div>
            <div class={"itemfeedback " + (props.news[1].true_or_false===true ? "correctfeedback":"wrongfeedback")}><img class="imgfeedback" src={props.news[1].path} alt=""/><h4 class="textfeedback">{props.news[1].feedback}</h4></div>
          </div>
          <div class="rowfeedback">
            <div class={"itemfeedback " + (props.news[2].true_or_false===true ? "correctfeedback":"wrongfeedback")}><img class="imgfeedback" src={props.news[2].path} alt=""/><h4 class="textfeedback">{props.news[2].feedback}</h4></div>
            <div class={"itemfeedback " + (props.news[3].true_or_false===true ? "correctfeedback":"wrongfeedback")}><img class="imgfeedback" src={props.news[3].path} alt=""/><h4 class="textfeedback">{props.news[3].feedback}</h4></div>
          </div>
          <div class="rowfeedback">
            <div class={"itemfeedback " + (props.news[4].true_or_false===true ? "correctfeedback":"wrongfeedback")}><img class="imgfeedback" src={props.news[4].path} alt=""/><h4 class="textfeedback">{props.news[4].feedback}</h4></div>
            <div class={"itemfeedback " + (props.news[5].true_or_false===true ? "correctfeedback":"wrongfeedback")}><img class="imgfeedback" src={props.news[5].path} alt=""/><h4 class="textfeedback">{props.news[5].feedback}</h4></div>
          </div>
        </div>

          <div className="close_modal" onClick={props.closeModal}>
            <svg className="close_modal_icon" viewBox="0 0 14 14">
              <path d="M7.94 7l5.527-5.527a.667.667 0 00-.94-.94L7 6.06 1.473.527a.67.67 0 00-.946.946L6.06 7 .527 12.527a.667.667 0 10.94.94L7 7.94l5.527 5.527a.667.667 0 00.94-.94L7.94 7z"/>
            </svg>
          </div>
      </Modal>);
}
