import React from 'react'
import './FeaturedMovie.css'

function FeaturedMovie({ movie }) {
  return (
      <div className='featured-movie-container'>
        <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie.title}></img>
      </div>
      
  )
}

export default FeaturedMovie