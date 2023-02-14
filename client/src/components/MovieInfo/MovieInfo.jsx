import React from 'react'
import './MovieInfo.css'
import { getMovieDetails } from '../../functions/requestfunctions'
import { useEffect, useState } from 'react';

function MovieInfo({ movieInfoStuff }) {

  



  function createMovieInfoCard(mInfo) {
    if (Object.keys(mInfo).length > 0) {
      console.log('movie info card showing');
      const { movieCredits, movieDetails, movieVideos } = mInfo;
      const mCredits = movieCredits;
      const mDetails = movieDetails;
      const mVideos = movieVideos;


    return (
      <div className='movieInfo-container'>
        <div className='movieInfo-image'>
            <img src={mDetails.poster_path !== null ? 
            `https://image.tmdb.org/t/p/w500${mDetails.poster_path}` :
            'https://via.placeholder.com/400'}></img>
        </div>
        <div className='info'>
          <div>
            <h1 id='title'>{mDetails.original_title}</h1>
            <p id='tagline'>{mDetails.tagline}</p>
            
          </div>
            
          <div>
            <p id='metadata'>{mDetails.runtime} mins / {mDetails.release_date}</p>
          </div>
          
          <div>
            <h2>Information:</h2>
            <p id='overview'>{mDetails.overview}</p>
            <h2>Credits:</h2>
          </div>
          


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





  return (
    <>
      {createMovieInfoCard(movieInfoStuff)}
    </>
      
    
    
  )
}

export default MovieInfo