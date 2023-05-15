import React from 'react';
import MovieInfo from '../MovieInfo/MovieInfo.jsx';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieDetails } from '../../functions/requestfunctions';
import LoadingCircle from '../LoadingCircle/LoadingCircle.jsx';

function MovieInfoContainer() {


    const [movieInfo, setMovieInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    let { movieId } = useParams();
    if (movieId === undefined) {
        movieId = 1771;
    }
    movieId = parseInt(movieId);


    async function fetchMovieDetails() {
        setIsLoading(true);
        let movieInfoObjects = {};

        try {
            movieInfoObjects = await getMovieDetails(movieId);
        } catch (error) {
            movieInfoObjects = {};
        }
        
        setIsLoading(false);
        setMovieInfo(movieInfoObjects);
        
    }

    function displayMovieInfo() {
        if (isLoading || Object.keys(movieInfo).length == 0) {
            return <LoadingCircle />
        } else {
            return <MovieInfo movieInfoStuff={movieInfo} />
        }
    }


    useEffect(() => {
        fetchMovieDetails();
    }, [movieId])

  return (
    displayMovieInfo()
  )
}

export default MovieInfoContainer;