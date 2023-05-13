import React from 'react'
import './MovieInfo.css'
import { getMovieDetails } from '../../functions/requestfunctions'
import { useEffect, useState } from 'react';

import MovieCard from '../MovieCard/MovieCard.jsx'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import genreIcons from '../../images/genres/index.js'



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


  function showWatchProviders(wpObj) {
    try {
      let wpArray = wpObj.buy.sort((a,b) => a.display_priority - b.display_priority);
      wpArray = wpArray.slice(0,5);
      // console.log(wpArray);
      return (
        <>
          <div id='watchprovider-header' >Watch On</div>
          <div id='watch-providers-container'>
            <div id='watch-providers'>
              {wpArray.map((provider, idx) => (
                <div className='provider-container'>
                  <img src={provider.logo_path ? `https://image.tmdb.org/t/p/w500${provider.logo_path}` :
                  `https://via.placeholder.com/45`}
                  alt={provider.provider_name}
                  ></img>
                  <p>{provider.provider_name}</p>

                </div>
              ))}
            </div>
          </div>
        </>

      )
    } catch {
      // return nothing if empty
      return <></>
    }
  }


  function addGenreTags(genreList) {
    let genreOfCurrMovie = genreList.slice(0,3);
    try {
      return (
        <div id='genretag-container'>
          {genreOfCurrMovie.map((genre, idx) => (
            <div className='genretag'>
              <Link to={`/genre/${genre.id}`} key={`genre-${genre.id}-${idx}`} >
                <img src={genreIcons[genre.name.toLowerCase()]} alt={genre.name}></img>
                <span>{genre.name}</span>
              </Link>
            </div>
          ))}
  
  
        </div>
  
      );
    } catch {
      return <></>
    }
    
  }

  function createMovieInfoCard(mInfo) {
    try {
      // console.log('movie info card showing');
      const { mCredits, mDetails, mVideos, mSimilar, mWatchProviders } = mInfo;
      console.log(mDetails);
      // console.log(mWatchProviders);
      // const mCredits = movieCredits;
      // const mDetails = movieDetails;
      // const mVideos = movieVideos;
      // const mSimilar = movieSimilar;

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
            <div id='header-container-info'>
              <h1 id='title'>{mDetails.original_title} ({mDetails.release_date.substring(0,4)})</h1>
              <p id='tagline'>{mDetails.tagline}</p>
            </div>
              
            <div id='metadata-container'>
              {/* <button id='trailer-btn'><a href={findMovieTrailer(mVideos)} target='_blank'>Trailer</a></button> */}

              <p id='metadata'>{mDetails.runtime} mins / {mDetails.release_date}</p>
            </div>
            
            
            {addGenreTags(mDetails.genres)}
            
            
            
            <div id='overview-container'>
              <h2>Overview:</h2>
              <p id='overview'>{mDetails.overview}</p>
            </div>


            
            <div id='trailer-container'>
              <h2>Trailer:</h2>
              <iframe src={findMovieTrailer(mVideos)} allowFullScreen></iframe>
            </div>
            
            


          </div>
        </div>


        {/* show watch providers */}
        {showWatchProviders(mWatchProviders)}


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