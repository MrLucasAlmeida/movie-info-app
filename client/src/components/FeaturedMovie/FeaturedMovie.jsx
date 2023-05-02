import React from 'react'
import { useEffect } from 'react';
import './FeaturedMovie.css'
import { getMovieDetails } from '../../functions/requestfunctions';

import { Link } from 'react-router-dom';

function FeaturedMovie({ movie, setShowMovieList, setMovieInfoId }) {

  function handleClick() {
    setShowMovieList(false);
    setMovieInfoId(movie.id);

  }

  if (Object.keys(movie).length === 0) {
    return null;
  }
  

  return (
    <Link to={`/movie/${movie.id}`} >
      <div className='featured-movie-container' onClick={() => handleClick()}>

        

        <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie.title}></img>


        <div className='featured-movie-info'>
          <h1>{movie?.title}</h1>
          <p>{movie?.overview}</p>
        </div>
      </div>
    </Link>
      
  )
}

export default FeaturedMovie