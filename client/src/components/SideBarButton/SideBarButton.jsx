import React from 'react'
import './SideBarButton.css'


function SideBarButton( {text}) {


  function handleClick() {
    console.log('click');
  }


  return (
    <div className='button'>
        <span className='span'>{text}</span> 
    </div>
  )
}

export default SideBarButton