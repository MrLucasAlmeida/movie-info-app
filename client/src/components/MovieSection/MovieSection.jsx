import React from 'react'
import './MovieSection.css'

import MovieCard from '../MovieCard/MovieCard.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie.jsx'
import MovieInfo from '../MovieInfo/MovieInfo.jsx'
import { useEffect, useState, useRef } from 'react'

import { getMovieDetails } from '../../functions/requestfunctions'


function MovieSection({ movies, searchTerm, setSearchTerm, showMovieList, setShowMovieList, setPageNumber, isLoading }) {

  const [featuredMovie, setFeaturedMovie] = useState({});
  const [movieInfoId, setMovieInfoId] = useState(1771);
  const [movieInfo, setMovieInfo] = useState({});
  // const [showMovieList, setShowMovieList] = useState(true);







  async function setMovieDetailsFunction(movieId) {
    const movieDetails = await getMovieDetailsFunction(movieId);
    console.log(movieDetails);
    setMovieInfo(movieDetails);
  
  }

  async function getMovieDetailsFunction(movieId) {
    console.log(movieId);
    if (movieId === -1) {
      console.log('movie id is invalid');
      return {};
    } else {
      const { movieCredits, movieDetails, movieVideos } = await getMovieDetails(movieId);
      // check if it came back with a valid response
      if (movieCredits.status_code === 34 ||
        movieDetails.status_code === 34 ||
        movieVideos.status_code === 34) {
        console.log('some information came back invalid');
        return {};
      } else {
        console.log('movie details loaded SUCCESSFULLY');
        return { movieCredits, movieDetails, movieVideos };
      }
    }
  }

  


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


  function handleInfiniteScroll() {
    let movieSec = document.querySelector('.scrollable-content-moviesection-container');
    if (!showMovieList) {return;}
    if (movieSec.scrollTop + movieSec.clientHeight + 1 >= movieSec.scrollHeight) {
      console.log('bottom of page');
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }




  function showMovieListFunction() {

    if (movies?.length > 0) {
      return (
        <>
        <FeaturedMovie  movie={featuredMovie}
                        setShowMovieList={setShowMovieList}
                        setMovieInfoId={setMovieInfoId}
                        ></FeaturedMovie>
        <div className='movie-card-container'>
          {movies.map((movie, idx) => (
            <MovieCard  key={idx}
                        movie={movie}
                        setMovieInfoId={setMovieInfoId}
                        setShowMovieList={setShowMovieList}></MovieCard>
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
      <MovieInfo movieInfoStuff={movieInfo}></MovieInfo>
      // <h1>NO MOVIEINFO</h1>
    )
  }


  


  useEffect(() => {
    // change the random movie featured
    if (showMovieList) {
      // console.log('featured movie is');
      setFeaturedMovie(getRandomMovie());
    }    
  }, [movies]);

  useEffect(() => {
    setMovieDetailsFunction(movieInfoId)
  }, [movieInfoId]);

  


  return (
    <div className='moviesection-container'>
      <div className='scrollable-content-moviesection-container' onScroll={handleInfiniteScroll}>

        <div className='search-container'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
        </div>





        {showMovieList ? showMovieListFunction() : showMovieInfoFunction()}
        {isLoading && <h1>Loading...</h1>}
        
      </div>
    </div>
  )
}

export default MovieSection