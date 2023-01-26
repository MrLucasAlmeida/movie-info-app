import React from 'react'
import './MovieCard.css'

function MovieCard({ movie }) {
  return (
    <div className='movie'>
      <div className='poster-image'>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          // src="https://via.placeholder.com/400"
          alt={"movie poster"}
        />
      </div>
    </div>
  )
}

export default MovieCard