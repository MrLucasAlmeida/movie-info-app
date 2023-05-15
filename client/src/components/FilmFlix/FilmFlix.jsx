import React from 'react'
import './FilmFlix.css'
import SideBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'


function FilmFlix() {

  return (
    <div className='filmflix-container'>
        <SideBar></SideBar>
        <MovieSection></MovieSection>
    </div>
  )
}

export default FilmFlix