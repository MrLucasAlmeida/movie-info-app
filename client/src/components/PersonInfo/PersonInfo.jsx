import React from 'react'

import './PersonInfo.css'

import MovieCard from '../MovieCard/MovieCard';

function PersonInfo({ personDetails, personMovielist }) {


  // pre process biography for better readability
  function processBiography(bioText) {

    if (!bioText) return 'No biography available';

    const sentences = bioText.split('\n');
    if (sentences.length < 2) return bioText;

    return sentences[0] + ' ' + sentences[sentences.length-1];
  }


  // function that returns all of the JSX for the movie info card
  function createMovieInfoCard(personInfoObject, personMovies) {
    try {
   
    const pDetails = personInfoObject;

    // if there is an error load nothing
    if (!pDetails.name) throw new Error('person details not found');

    return (
      <div id='personInfo-container'>
        <div id='personInfoDetails-container'>
          <div id='personInfoDetails-image-container'>
            <img  
              src={pDetails.profile_path ? 
                `https://image.tmdb.org/t/p/h632${pDetails.profile_path}` :
                'https://via.placeholder.com/600x900'}
              ></img>
          </div>
          <div id='personInfoDetails-info-container'>
            <div>
              <h1 id='name'>{pDetails.name}</h1>
              {pDetails.birthday && <p id='birthdate'>Born: {pDetails.birthday}</p>}
            </div>
            <div>
              <h2>Biography: </h2>
              <p id='biography'>{processBiography(pDetails.biography)}</p>
            </div>
            
          </div>
        </div>

        {/* movies by person */}

        {personMovies.length > 0 && <div id='person-movielist-header'>Featured In</div>}
        <div id='person-movielist-container'>
          {personMovies.map((movie,idx) => (
            <MovieCard movie={movie} key={`${movie.id}-${idx}`}/>
          ))}

        </div>
      </div>
    )
    } catch (err) {
      // loads h1 if there is an error
      return (
        <div className='empty-movieinfo'>
          <h1>ACTOR INFORMATION FAILED TO LOAD</h1>
        </div>
        
      )
    }
  }


  return (
    createMovieInfoCard(personDetails,personMovielist)
  )
}

export default PersonInfo