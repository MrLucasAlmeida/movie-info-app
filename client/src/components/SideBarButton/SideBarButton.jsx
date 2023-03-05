import React from 'react'
import './SideBarButton.css'


function SideBarButton( {text, image, genreId, setQueryTerm, setShowMovieList }) {


  function handleClick() {
    console.log(genreId);
    setQueryTerm('%genre:' + genreId);
    setShowMovieList(true);
  }


  return (
    <div className='button' onClick={() => handleClick()}>
        <img src={image} alt={text}></img>
        <span className='span'>{text}</span> 
    </div>
  )
}

export default SideBarButton