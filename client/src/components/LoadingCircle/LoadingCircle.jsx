import React from 'react'
import './LoadingCircle.css'

function LoadingCircle() {
  return (
    <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

    </div>
  )
}

export default LoadingCircle