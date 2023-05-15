import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieListbyGenre } from '../../functions/requestfunctions';
import MovieList from '../MovieList/MovieList.jsx';
import LoadingCircle from '../LoadingCircle/LoadingCircle';


function GenreContainer() {

    const [movieList, setMovieList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    // the genre id is passed in as a parameter
    let { genreId } = useParams();
    if (genreId === undefined) {
        // set genre id as default 'action'
        genreId = 28;
    }



    async function loadMovieListbyGenre(genreId, pageNum) {
        // fetch movies by genre id
        setIsLoading(true);
        let response = await getMovieListbyGenre(genreId, pageNum);
        
        setMovieList(response);
        setIsLoading(false);
    }


    function displayMovies() {
      if (isLoading) {
          return <LoadingCircle/>
      } else {
          return (
              <>
                  <MovieList movies={movieList} />
                  {movieList.length > 0 && (
                      <div id='arrows-container'>
                      <div id='prev-btn' onClick={() => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1,1))}>Prev</div>
                      <div id='current-page'>{pageNumber}</div>
                      <div id='next-btn' onClick={() => setPageNumber(prevPageNumber => prevPageNumber + 1)}>Next</div>
                      </div>
                  )}
              </>
          )
      }
  }



    useEffect(() => {
      // genre id changed
        if (pageNumber === 1) {
          loadMovieListbyGenre(genreId, 1);
        }
        setPageNumber(1);
        
        
        
      }, [genreId]);


    useEffect(() => {
        loadMovieListbyGenre(genreId, pageNumber);
        
        // scroll to the top of the page
        let scrollContainer = document.querySelector('.scrollable-content-moviesection-container');
        scrollContainer.scrollTop = 0;

      }, [pageNumber]);

  return (
    displayMovies()
  )
}

export default GenreContainer