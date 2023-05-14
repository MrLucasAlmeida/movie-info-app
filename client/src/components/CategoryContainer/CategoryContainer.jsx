import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieListbyCategory } from '../../functions/requestfunctions';
import MovieList from '../MovieList/MovieList.jsx';
import LoadingCircle from '../LoadingCircle/LoadingCircle';


function CategoryContainer() {

    const [movieList, setMovieList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    // the genre id is passed in as a parameter
    let { category } = useParams();
    if (category === undefined) {
        // set genre id as default 'action'
        category = 'popular';
    }



    async function loadMovieListbyCategory(category, pageNum) {
        // set page to loading
        setIsLoading(true);
        // fetch movies by genre id
        let response = await getMovieListbyCategory(category, pageNum);
        setMovieList(response);
        setIsLoading(false);
    }



      function displayMovies() {
        if (isLoading) {
            return <LoadingCircle />
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
      // category changed
        if (pageNumber === 1) {
          loadMovieListbyCategory(category, 1);
        }
        setPageNumber(1);
        
      }, [category]);


    useEffect(() => {
        loadMovieListbyCategory(category, pageNumber);
        
        // scroll to the top of the page
        let scrollContainer = document.querySelector('.scrollable-content-moviesection-container');
        scrollContainer.scrollTop = 0;
      }, [pageNumber]);

  return (
    displayMovies()
    
  )
}

export default CategoryContainer