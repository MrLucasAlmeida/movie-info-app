import React from 'react'
import './SideBarButton.css'

function SideBarButton( {text}) {
  return (
    <div className='button'>
        <span>{text}</span>
    </div>
  )
}

export default SideBarButton