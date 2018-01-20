import React from 'react'

export default function Popup({
  text,
  closePopup
}){
  return(
    <div className='popup'>
      <div className='popup_inner'>
        <h1>{text}</h1>
        <button
          onClick={closePopup}
        >Click Me</button>
      </div>
    </div>
  )
}