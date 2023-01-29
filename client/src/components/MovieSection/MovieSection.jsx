import React from 'react'
import './MovieSection.css'

import MovieCard from '../MovieCard/MovieCard.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie.jsx'

import { useEffect, useState } from 'react'

function MovieSection({ movies, searchTerm, setSearchTerm }) {


  function getRandomMovie() {
    // get a random movie from the movies array
    if (movies.length === 0) {return {}}
    // keep looking for new movie until we find one that has a backdrop image
    let randomIdx = Math.floor(Math.random() * movies.length);

    while (movies[randomIdx].backdrop_path === null) {
      randomIdx = Math.floor(Math.random() * movies.length);
    }

    console.log(movies[randomIdx]);
    setFeaturedMovie(movies[randomIdx]);
  }

  function placePoster() {
    if (featuredMovie === {}) {
      return <div>NO POSTER</div>
    } else {
      return (
        <FeaturedMovie movie={featuredMovie}></FeaturedMovie>
      )
    }
  }


  const [featuredMovie, setFeaturedMovie] = useState({});


  useEffect(() => {
    // change the random movie featured
    getRandomMovie();
  }, [movies]);


  return (
    <div className='moviesection-container'>
      <div className='scrollable-content-moviesection-container'>

        <div className='search-container'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
        </div>
        
        {placePoster()}
        







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