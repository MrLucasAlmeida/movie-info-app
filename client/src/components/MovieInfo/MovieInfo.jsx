import React from 'react'
import './MovieInfo.css'
import { getMovieDetails } from '../../functions/requestfunctions'
import { useEffect, useState } from 'react';

function MovieInfo( { movieId }) {

  const [movieInformation, setMovieInformation] = useState({});


  useEffect(async () => {
    console.log(movieId);
    if (movieId === undefined) {
      console.log('movie id is undefined');
    } else {
      await getMovieDetails(movieId);
    }
  }, [movieId]);




  return (
    <div className='movieInfo-container'>
      <div className='movieInfo-image'>

      </div>
      <div className='movieInfo-info'>
        
      </div>
    </div>
  )
}

export default MovieInfo