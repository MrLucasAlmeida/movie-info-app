import React from 'react'
import './SideBarButton.css'
import { useNavigate } from 'react-router'


function SideBarButton( {text, image, id}) {

  const navigate = useNavigate();

  function handleClick() {
    console.log(id);
    // if not a number then its a category not a genre
    if (typeof id === 'number') {
      navigate(`/genre/${id}`);
    } else {
      navigate(`/category/${id}`);
    }



  }


  return (
    <div className='sidebarbutton' onClick={() => handleClick()}>
        <img src={image} alt={text}></img>
        <span className='span'>{text}</span>
    </div>
  )
}

export default SideBarButton