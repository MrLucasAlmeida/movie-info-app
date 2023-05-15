import React from 'react';
import PersonInfo from '../PersonInfo/PersonInfo.jsx';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPersonDetails, getMovieListbyPerson } from '../../functions/requestfunctions';
import LoadingCircle from '../LoadingCircle/LoadingCircle.jsx';

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
          const pDetails = await getPersonDetails(personId);
          const pMovieList = await getMovieListbyPerson(personId, 1);


          setIsLoading(false);

          setPersonInfo(pDetails);
          setPersonMovielist(pMovieList);
      }

      function displayPersonInfo() {
          if (isLoading || Object.keys(personInfo).length == 0) {
              return <LoadingCircle />
          } else {
              return <PersonInfo personDetails={personInfo} personMovielist={personMovielist} />
          }
      }

      useEffect(() => {
          fetchPersonDetails();
      }, [personId]);

      
  return (
    displayPersonInfo()
  )
}

export default PersonInfoContainer