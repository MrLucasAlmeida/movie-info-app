import React from 'react'
import './MovieCard.css'

function MovieCard({ movie }) {
  return (
    <div className='movie'>
      <div className='poster-image'>
        <img 
          src={"https://image.tmdb.org/t/p/w500/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg"}
          alt={"movie poster"}
        />
      </div>
    </div>
  )
}

export default MovieCard