import React from 'react'
import './MovieCard.css'

function MovieCard({ movie }) {
  return (
    <div className='movie'>
      <div className='poster-image'>
        <img 
          src={movie.poster_path !== null ? 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
            'https://via.placeholder.com/400'}
          // src="https://via.placeholder.com/400"
          alt={"movie poster"}
        />
      </div>
    </div>
  )
}

export default MovieCard