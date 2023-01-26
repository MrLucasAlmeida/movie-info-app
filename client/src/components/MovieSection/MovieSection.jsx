import React from 'react'
import './MovieSection.css'

import MovieCard from '../MovieCard/MovieCard.jsx'
import SearchBar from '../SearchBar/SearchBar'
import { useEffect } from 'react'

function MovieSection({ movies, searchTerm, setSearchTerm }) {


  useEffect(() => {

  }, []);


  return (
    <div className='moviesection-container'>
      <div className='scrollable-content-moviesection-container'>

        <div className='search-container'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
        </div>
        


        {
        movies?.length > 0 ? (
          <div className='movie-card-container'>
            {movies.map((movie, idx) => (
              <MovieCard key={idx} movie={movie}></MovieCard>
            ))}
            
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}
          
        
      </div>
    </div>
  )
}

export default MovieSection