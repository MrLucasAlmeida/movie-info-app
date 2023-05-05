import React from 'react'
import './MovieInfo.css'
import { getMovieDetails } from '../../functions/requestfunctions'
import { useEffect, useState } from 'react';

import MovieCard from '../MovieCard/MovieCard.jsx'
import { useNavigate } from 'react-router';



function MovieInfo({ movieInfoStuff }) {

  const navigate = useNavigate();

  function handleMovieActorClick(personId) {
    navigate(`/person/${personId}`);
  }
  
  function showMovieActorImages(actorArray) {
    let actorImages = [];
    for (let i = 0; i < 6; i++) {
        actorImages.push((
          <div id='actor-container'>
            <img  
            src={actorArray[i].profile_path ? 
              `https://image.tmdb.org/t/p/w185${actorArray[i].profile_path}` :
              'https://via.placeholder.com/100x150'}
            onClick={(e) => handleMovieActorClick(actorArray[i].id)}
            key={`actor-image-${actorArray[i].id}`}
            ></img>
            <p>{actorArray[i].name}</p>
            <p>{actorArray[i].character}</p>
          </div>
          
          
        ));
    }
    return actorImages;
  }
  // returns video link for movie trailer
  function findMovieTrailer(videos) {
    for (let i = 0; i < videos.results.length; i++) {
      if (videos.results[i].type === 'Trailer') {
        console.log('movie trailer found');
        // return `https://www.youtube.com/watch?v=${videos.results[i].key}`;
        return `https://www.youtube.com/embed/${videos.results[i].key}`;
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
      // sort by most popular
      mSimilar.results = mSimilar.results.sort((a,b) => b.vote_average - a.vote_average);
      // limit to just 10 values
      mSimilar.results = mSimilar.results.slice(0, 12);

      
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
              <h1 id='title'>{mDetails.original_title} ({mDetails.release_date.substring(0,4)})</h1>
              <p id='tagline'>{mDetails.tagline}</p>
              
            </div>
              
            <div>
              {/* <button id='trailer-btn'><a href={findMovieTrailer(mVideos)} target='_blank'>Trailer</a></button> */}

              <p id='metadata'>{mDetails.runtime} mins / {mDetails.release_date}</p>
            </div>
            
            
              
            
            
            
            <div>
              <h2>Overview:</h2>
              <p id='overview'>{mDetails.overview}</p>
            </div>
            
            <div>
              <h2>Trailer:</h2>
              <iframe src={findMovieTrailer(mVideos)} allowFullScreen></iframe>
            </div>
            
            


          </div>
        </div>
        {/* show cast */}
        <div id='cast-header' >Top Cast:</div>
        <div id='actors'>
          {showMovieActorImages(mCredits.cast)}
        </div>



        {/* display movie recommendations here */}
        {mSimilar.results.length > 0 && <div id='recommended'>You Might Also Like</div>}
        
        <div id='reccMoviesContainer'>
        {mSimilar.results.map((movie, idx) => (
            
            <MovieCard key={`${movie.id}-${idx}`}
                      movie={movie}></MovieCard>
            
            
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