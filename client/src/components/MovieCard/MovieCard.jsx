import React from 'react'
import './MovieCard.css'

import { Link } from "react-router-dom";

function MovieCard({ movie }) {

  return (
    
      <div className='movie'>
        <Link to={`/movie/${movie.id}`} >
        <div className='poster-image'>
          <img 
            src={movie.poster_path !== null ? 
              `https://image.tmdb.org/t/p/w780${movie.poster_path}` :
              'https://via.placeholder.com/200x300'}
            alt={"movie poster"}
          />
        </div>
        <p>{movie.title}</p>
        </Link>
      </div>
    
  )
}

export default MovieCard