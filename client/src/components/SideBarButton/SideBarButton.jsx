import React from 'react'
import './SideBarButton.css'


function SideBarButton( {text, image, id, setQueryTerm, setShowMovieList }) {


  function handleClick() {
    console.log(id);
    // if not a number then its a category not a genre
    if (typeof id === 'number') {
      setQueryTerm('%genre:' + id);
    } else {
      setQueryTerm('%category:' + id);
    }
    
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