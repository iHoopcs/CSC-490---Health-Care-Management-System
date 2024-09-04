import React from 'react'
import './Popup.css'

/** 
  * Displays a popup using css styling, appears as a window to 
  * the user and fades the current pages background while active
*/
function Popup(props) {
  return (props.trigger) ? (
    <div className="popup" data-testid="popup-1">
      <div className="popup-inner">
        <button className="close-btn"
          onClick={() => props.setTrigger(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
  ) :
    "";
}

export default Popup;
