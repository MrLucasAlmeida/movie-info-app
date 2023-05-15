import React from 'react'
import './MovieSection.css'

import SearchBar from '../SearchBar/SearchBar.jsx'
import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";

import MoonIcon from '../../images/moon.svg';
import SunIcon from '../../images/sun.svg';

import GenreContainer from '../GenreContainer/GenreContainer.jsx';
import KeywordSearchContainer from '../KeywordSearchContainer/KeywordSearchContainer.jsx';
import CategoryContainer from '../CategoryContainer/CategoryContainer.jsx';
import MovieInfoContainer from '../MovieInfoContainer/MovieInfoContainer.jsx';
import PersonInfoContainer from '../PersonInfoContainer/PersonInfoContainer.jsx';


function MovieSection() {

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // add or remove light mode class to all elements
    if (isLightMode) {
      document.querySelectorAll('*').forEach(element => element.classList.add('light-mode'));
    } else {
      document.querySelectorAll('*').forEach(element => element.classList.remove('light-mode'));  
    }
  }, [isLightMode]);

  
  return (
    <div className='moviesection-container'>
      <div className='scrollable-content-moviesection-container'>

        <div className='top-header-container'>
          <div id='light-dark-container' onClick={() => setIsLightMode(prev => !prev)}>
            <img src={isLightMode ? MoonIcon: SunIcon}></img>
          </div>
          <SearchBar></SearchBar>
          <div style={{marginRight: 40}}></div>
        </div>


          
          <Routes>
            <Route exact path="/" element={<GenreContainer/>}/>
            <Route path="/genre/:genreId" element={<GenreContainer/>}/>
            <Route path="/search/:searchTerm" element={<KeywordSearchContainer/>}/>
            <Route path="/category/:category" element={<CategoryContainer/>}/>
            <Route path="/movie/:movieId" element={<MovieInfoContainer/>}/>
            <Route path="/person/:personId" element={<PersonInfoContainer/>}/>
          </Routes>
        
      </div>
    </div>
  )
}

export default MovieSection