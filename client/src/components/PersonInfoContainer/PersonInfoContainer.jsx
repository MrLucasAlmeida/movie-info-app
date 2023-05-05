import React from 'react';
import PersonInfo from '../PersonInfo/PersonInfo.jsx';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPersonDetails, getMovieListbyPerson } from '../../functions/requestfunctions';

function PersonInfoContainer() {


      const [personInfo, setPersonInfo] = useState({});
      const [personMovielist, setPersonMovielist] = useState([]);
      const [isLoading, setIsLoading] = useState(false);


      let { personId } = useParams();
      if (personId === undefined) {
        personId = 257;
      }
      personId = parseInt(personId);








      async function fetchPersonDetails() {
          setIsLoading(true);
          let personInfoObject = {};
          console.log('trying to fetch person details for person id: ' + personId);
          const pDetails = await getPersonDetails(personId);
          const pMovieList = await getMovieListbyPerson(personId, 1);


          setIsLoading(false);

          // moves scroll to top of page
          // let movieSec = document.querySelector('.scrollable-content-moviesection-container');
          // movieSec.scrollTop = 0;
          // console.log(movieInfoObjects);
          setPersonInfo(pDetails);
          setPersonMovielist(pMovieList);
          // return <MovieInfo movieInfoStuff={movieInfoObjects}/>

      }

      function displayPersonInfo() {
          console.log('isloading ' + isLoading);
          if (isLoading) {
              return <div>loading...</div>
          } else {
              return <PersonInfo personDetails={personInfo} personMovielist={personMovielist} />
          }
      }



      // useEffect(() => {
      //     fetchMovieDetails();
      // }, []);

      useEffect(() => {
          fetchPersonDetails();
      }, [personId]);









  return (
    displayPersonInfo()
  )
}

export default PersonInfoContainer