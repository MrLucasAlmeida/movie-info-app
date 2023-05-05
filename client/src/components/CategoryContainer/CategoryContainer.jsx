import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieListbyCategory } from '../../functions/requestfunctions';
import MovieList from '../MovieList/MovieList.jsx';


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
        // set page to laoding
        setIsLoading(true);
        // fetch movies by genre id
        let response = await getMovieListbyCategory(category, pageNum);
        setMovieList(response);
        setIsLoading(false);
        


        // newMoviesList = newMoviesList.filter((movie, index) => {
        //     return newMoviesList.indexOf(movie) === index;
        // });

        // // handles if we grabbed all the movies
        // for (let i = 0; i < response.length; i++) {
        //     let flag = true;
        //     for (let j = 0; j < newMoviesList.length; j++) {
        //         if (response[i].id === newMoviesList[j].id) {
        //             console.log("there was a duplicate movie");
        //             flag = false;
        //             break;
        //        }
        //     }
        //     // if we didn't get to the end of the list, add the movie
        //     if (flag) {
        //         newMoviesList.push(response[i]);
        //     }
        // }

        // this keeps problems from happening
        
    }


    function handleInfiniteScroll() {
        let movieSec = document.querySelector('.scrollable-content-moviesection-container');
        if (movieSec.scrollTop + movieSec.clientHeight + 1 >= movieSec.scrollHeight) {
          console.log('bottom of page');
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      }




      function displayMovies() {
        if (isLoading) {
            return <div>loading...</div>
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
        // movieListQuery(searchTerm);
        // console.log('app loaded');

        console.log('category changed');
        if (pageNumber === 1) {
          loadMovieListbyCategory(category, 1);
        }
        setPageNumber(1);
        
      }, [category]);


    useEffect(() => {
        // if (pageNumber === 1) {console.log('on first page');return;}
        console.log("page number changed");
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