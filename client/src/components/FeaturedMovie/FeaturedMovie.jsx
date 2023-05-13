import React from 'react'
import { useEffect, useState } from 'react';
import './FeaturedMovie.css'
import { getMovieDetails } from '../../functions/requestfunctions';

import { Link } from 'react-router-dom';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

function FeaturedMovie({ movie}) {

  const [imageLoaded, setImageLoaded] = useState(false);

  console.log('featured movie');
  console.log(movie);


  if (Object.keys(movie).length === 0) {
    console.log('NO MOVIES TO SHOW');
    return <></>;
  }
  console.log(`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`)

  return (
    <Link to={`/movie/${movie.id}`} >
      <div className='featured-movie-container'>

        

        <img src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`} 
        onLoad={() => setImageLoaded(true)}
        alt={movie.title}></img>

        { imageLoaded ? 
        <div className='featured-movie-info'>
          <h1>{movie?.title}</h1>
          <p>{movie?.overview}</p>
        </div>
        :
        <div style={{height: '100vh'}}></div>
        }


        
      </div>
    </Link>
      
  )
}

export default FeaturedMovie