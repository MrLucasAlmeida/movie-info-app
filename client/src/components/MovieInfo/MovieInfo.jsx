import React from 'react'
import './MovieInfo.css'
import { getMovieDetails } from '../../functions/requestfunctions'
import { useEffect, useState } from 'react';

function MovieInfo({ movieId }) {

  async function setMovieDetails() {
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



  function createMovieInfoCard(movieInfo) {
    console.log('checking movieInfo object');
    
    console.log(Object.keys(movieInfo));
    if (Object.keys(movieInfo).length > 0) {
    return (
      <div className='.movieInfo-container'>
        <div className='movieInfo-image'>

        </div>
        <div className='movieInfo-info'>
          
        </div>
      </div>
    )
    } else {
      console.log('movie info failed to load');
      return (
        <div className='empty-movieinfo'>
          <h1>MOVIE INFORMATION FAILED TO LOAD</h1>
        </div>
        
      )
    }
  }




  const [movieInformation, setMovieInformation] = useState({});


  useEffect(() => {
    setMovieInformation(setMovieDetails());
  }, []);




  return (
    <>
      {createMovieInfoCard(movieInformation)}
    </>
    
  )
}

export default MovieInfo