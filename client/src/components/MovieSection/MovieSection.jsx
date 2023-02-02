import React from 'react'
import './MovieSection.css'

import MovieCard from '../MovieCard/MovieCard.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie.jsx'
import MovieInfo from '../MovieInfo/MovieInfo.jsx'
import { useEffect, useState, useRef } from 'react'


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
    return movies[randomIdx];
  }


  function showMovieListFunction() {

    if (movies?.length > 0) {
      return (
        <>
        <FeaturedMovie movie={featuredMovie}></FeaturedMovie>
        <div className='movie-card-container'>
          {movies.map((movie, idx) => (
            <MovieCard key={idx} movie={movie}></MovieCard>
          ))}
          
        </div>
        </>
      )
    } else {
      return (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )
    }
  }

  function showMovieInfoFunction() {

    return (
      <MovieInfo movieId={movieInfoId}></MovieInfo>
      // <h1>NO MOVIEINFO</h1>
    )
  }


  const [featuredMovie, setFeaturedMovie] = useState({});
  const [movieInfoId, setMovieInfoId] = useState(1771);
  const [showMovieList, setShowMovieList] = useState(false);


  useEffect(() => {

  }, []);

  useEffect(() => {
    // change the random movie featured
    if (showMovieList) {
      console.log('featured movie is');
      setFeaturedMovie(getRandomMovie());
    }    
  }, [movies]);


  return (
    <div className='moviesection-container'>
      <div className='scrollable-content-moviesection-container'>

        <div className='search-container'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
        </div>
        
        
        







        {showMovieList ? showMovieListFunction() : showMovieInfoFunction()}
          
        
      </div>
    </div>
  )
}

export default MovieSection