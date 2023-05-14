import React, { useEffect, useState } from 'react'

import './MovieList.css'
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie.jsx'
import MovieCard from '../MovieCard/MovieCard.jsx'
import LoadingCircle from '../LoadingCircle/LoadingCircle';

function MovieList({ movies }) {

    const [randMovie, setRandMovie] = useState({});

    function loadMovieList() {
        if (movies?.length > 0) {
            return (
            <>
            <FeaturedMovie  movie={randMovie}
                            ></FeaturedMovie>
 
            <div className='movie-card-container'>
                {movies.map((movie, idx) => (
                    
                    <MovieCard key={`${movie.id}-${idx}`}
                            movie={movie}
                            ></MovieCard>
                    
                
                ))}
                
            </div>
            </>
            )
        } else {
            return (
            <div className='empty'>
                <h2>No movies found</h2>
            </div>
            )
        }
    }

    function getRandomMovie() {
        // get a random movie from the movies array
        if (movies.length === 0) {return {}}
        // keep looking for new movie until we find one that has a backdrop image
        let randomIdx = Math.floor(Math.random() * movies.length);
    
        while (movies[randomIdx].backdrop_path === null) {
          randomIdx = Math.floor(Math.random() * movies.length);
        }

        // console.log(movies[randomIdx]);
        return movies[randomIdx];
    }


    useEffect(() => {
        setRandMovie(getRandomMovie());
    }, [movies]);





  return (
    loadMovieList()
  )
}

export default MovieList