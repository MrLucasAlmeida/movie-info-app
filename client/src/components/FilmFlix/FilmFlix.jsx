import React from 'react'
import './FilmFlix.css'
import NavBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'


function FilmFlix() {
  return (
    <div className='filmflix-container'>
        <NavBar></NavBar>
        <MovieSection></MovieSection>
    </div>
  )
}

export default FilmFlix