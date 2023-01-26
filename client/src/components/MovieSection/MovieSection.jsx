import React from 'react'
import './MovieSection.css'

import MovieCard from '../MovieCard/MovieCard.jsx'
import SearchBar from '../SearchBar/SearchBar'

function MovieSection() {

  return (
    <div className='moviesection-container'>
      <div className='scrollable-content-moviesection-container'>

        <div className='search-container'>
          <SearchBar></SearchBar>
        </div>
        


        <div className='movie-card-container'>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
          <MovieCard></MovieCard>
        </div>
        
      </div>
    </div>
  )
}

export default MovieSection