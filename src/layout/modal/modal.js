import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    
    <div onClick={props.onDismiss} class="modal-dialog" >
      <div
        onClick={e => e.stopPropagation()}
        className="modal-content"
      >
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <button type="button" className="close" onClick={props.onDismiss}>
            <span aria-hidden="true">×</span>
          </button>
          </div>
        <div className="modal-body">{props.content}</div>
        <div className="modal-footer">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
