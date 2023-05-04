import React from 'react'

import './PersonInfo.css'

function PersonInfo({ personInfoStuff }) {



  function processBiography(bioText) {

    if (!bioText) return 'No biography available';

    console.log('processing bio text');
    const sentences = bioText.split('. ');
    if (sentences.length < 2) return bioText;


    return sentences[0];

  }





  function createMovieInfoCard(personInfoObject) {

   
    const pDetails = personInfoObject;
    console.log(pDetails);

    return (
      <div id='personInfo-container'>
        <div id='personInfoDetails-container'>
          <div id='personInfoDetails-image-container'>
            <img  
              src={pDetails.profile_path ? 
                `https://image.tmdb.org/t/p/h632${pDetails.profile_path}` :
                'https://via.placeholder.com/185'}
              ></img>
          </div>
          <div id='personInfoDetails-info-container'>
            <div>
              <h1 id='name'>{pDetails.name}</h1>
              <p id='birthdate'>Born: {pDetails.birthday}</p>
            </div>
            <div>
              <h2>Biography: </h2>
              <p id='biography'>{processBiography(pDetails.biography)}</p>
            </div>
            
          </div>
          {/* movies by person */}

          <h2></h2>





        </div>





      </div>


    )
    


  }
        

    
  







  return (
    createMovieInfoCard(personInfoStuff)
  )
}

export default PersonInfo