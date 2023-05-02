import React from 'react';
import '../MovieInfo/MovieInfo.jsx';
import MovieInfo from '../MovieInfo/MovieInfo.jsx';

import { useEffect, useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { RouteContext } from 'react-router';

import { getMovieDetails } from '../../functions/requestfunctions';

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
        console.log('trying to fetch movie details for movie id: ' + movieId);
        if (movieId === -1) {
            console.log('movie id is invalid');
            return {};
        } else {
            const { movieCredits, movieDetails, movieVideos, movieSimilar } = await getMovieDetails(movieId);
            // check if it came back with a valid response
            if (movieCredits.status_code === 34 ||
                movieDetails.status_code === 34 ||
                movieVideos.status_code === 34 ||
                movieSimilar.status_code === 34) {
                console.log('some information came back invalid');
                return {};
            } else {
                // console.log('movie details loaded SUCCESSFULLY');
                movieInfoObjects = { movieCredits, movieDetails, movieVideos, movieSimilar };
            }
        }

        setIsLoading(false);

        // moves scroll to top of page
        // let movieSec = document.querySelector('.scrollable-content-moviesection-container');
        // movieSec.scrollTop = 0;
        // console.log(movieInfoObjects);
        setMovieInfo(movieInfoObjects);
        // return <MovieInfo movieInfoStuff={movieInfoObjects}/>

    }

    function displayMovieInfo() {
        console.log('isloading ' + isLoading);
        if (isLoading) {
            return <div>loading...</div>
        } else {
            return <MovieInfo movieInfoStuff={movieInfo} />
        }
    }



    // useEffect(() => {
    //     fetchMovieDetails();
    // }, []);

    useEffect(() => {
        fetchMovieDetails();
    }, [movieId])

  return (
    displayMovieInfo()
  )
}

export default MovieInfoContainer;