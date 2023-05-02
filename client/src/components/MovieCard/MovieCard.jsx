import React from 'react'
import './MovieCard.css'

import { Link } from "react-router-dom";

function MovieCard({ movie }) {


  
  return (
    <Link to={`/movie/${movie.id}`} >
      <div className='movie'>
        <div className='poster-image'>
          <img 
            src={movie.poster_path !== null ? 
              `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
              'https://via.placeholder.com/400'}
            alt={"movie poster"}
          />
        </div>
      </div>
    </Link>
  )
}

export default MovieCard