import React from 'react'
import './MovieInfo.css'
import { getMovieDetails } from '../../functions/requestfunctions'
import { useEffect, useState } from 'react';

import MovieCard from '../MovieCard/MovieCard.jsx'

function MovieInfo({ movieInfoStuff, setMovieInfoId, setShowMovieList }) {

  
  function showMovieActorImages(actorArray) {
    console.log('showing movie actor images');
    let actorImages = [];
    for (let i = 0; i < 6; i++) {
      if (actorArray[i].profile_path !== null) {
        console.log('actor image showing');
        actorImages.push((
          <img src={`https://image.tmdb.org/t/p/w185${actorArray[i].profile_path}`}></img>
        ));
      } else {
        console.log('actor image failed to load');
        actorImages.push((
          <img src='https://via.placeholder.com/185'></img>
        ));
      }
    }
    return actorImages;
  }
  // returns video link for movie trailer
  function findMovieTrailer(videos) {
    console.log('finding movie trailer');
    for (let i = 0; i < videos.results.length; i++) {
      if (videos.results[i].type === 'Trailer') {
        console.log('movie trailer found');
        return `https://www.youtube.com/watch?v=${videos.results[i].key}`;
      }
    }
    console.log('movie trailer not found');
    return 'https://www.youtube.com';
  }


  function createMovieInfoCard(mInfo) {
    try {
      // console.log('movie info card showing');
      const { movieCredits, movieDetails, movieVideos, movieSimilar } = mInfo;
      const mCredits = movieCredits;
      const mDetails = movieDetails;
      const mVideos = movieVideos;
      const mSimilar = movieSimilar;

      // checks if there is over 20 movies in the recommendations array
      // if there is, it will only show the first 20
      // also sort by popularity
      console.log(mSimilar.results);
      // sort by most popular
      mSimilar.results = mSimilar.results.sort((a,b) => b.vote_average - a.vote_average);
      // limit to just 10 values
      mSimilar.results = mSimilar.results.slice(0, 10);

      if (mSimilar.results.length > 20) {
        // mSimilar.results = mSimilar.results.slice(0, 20);
      }


    return (
      <div className='movieInfoCard-container'>
        <div className='info-container'>
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
              <button id='trailer-btn'><a href={findMovieTrailer(mVideos)} target='_blank'>Trailer</a></button>
              <p id='metadata'>{mDetails.runtime} mins / {mDetails.release_date}</p>
            </div>
            
            
              
            
            
            
            <div>
              <h2>Information:</h2>
              <p id='overview'>{mDetails.overview}</p>
              <h2>Credits:</h2>
              <div id='actors'>
                {showMovieActorImages(mCredits.cast)}
              </div>
            </div>
            


          </div>
        </div>

        {/* display movie recommendations here */}
        {mSimilar.results.length > 0 && <div id='recommended'>Recommended</div>}
        
        <div id='reccMoviesContainer'>
        {mSimilar.results.map((movie, idx) => (
            <MovieCard  key={idx}
                        movie={movie}
                        setMovieInfoId={setMovieInfoId}
                        setShowMovieList={setShowMovieList}></MovieCard>
          ))}
        </div>

        

      </div>
    )
    } catch {
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