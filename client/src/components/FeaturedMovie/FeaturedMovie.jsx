import React from 'react'
import './FeaturedMovie.css'

function FeaturedMovie({ movie }) {
  if (Object.keys(movie).length === 0) {
    return null;
  }

  return (
      <div className='featured-movie-container'>

        

        <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie.title}></img>


        <div className='featured-movie-info'>
          <h1>{movie?.title}</h1>
          <p>{movie?.overview}</p>
        </div>
      </div>
      
  )
}

export default FeaturedMovie