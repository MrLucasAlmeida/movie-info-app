import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieListByKeyword } from '../../functions/requestfunctions';
import MovieList from '../MovieList/MovieList.jsx';

import LoadingCircle from '../LoadingCircle/LoadingCircle.jsx';


function KeywordSearchContainer() {

    const [movieList, setMovieList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    // the genre id is passed in as a parameter
    let { searchTerm } = useParams();
    if (searchTerm === undefined) {
        // set genre id as default 'action'
        searchTerm = 'cars';
    }



    async function loadMovieListbySearch(keyword, pageNum) {
        // set page to laoding
        setIsLoading(true);
        // fetch movies by genre id
        let response = await getMovieListByKeyword(keyword, pageNum);
        setMovieList(response);
        setIsLoading(false);

        // let newMoviesList = [...movieList];

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
          console.log('bottom of page in keywordSearchContainer');
          setPageNumber(prevPageNumber => prevPageNumber + 1);
          console.log(pageNumber);
        }
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





    // useEffect(() => {
        
    

        
    //   }, []);

    useEffect(() => {

        console.log('search term changed');
        if (pageNumber === 1) {
            loadMovieListbySearch(searchTerm, 1);
        }
        setPageNumber(1);
    }, [searchTerm]);


    useEffect(() => {
        // if (pageNumber === 1) {console.log('on first page');return;}
        console.log("page number changed");
        loadMovieListbySearch(searchTerm, pageNumber);
        

        // scroll to the top of the page
        let scrollContainer = document.querySelector('.scrollable-content-moviesection-container');
        scrollContainer.scrollTop = 0;
      }, [pageNumber]);

  return (
    displayMovies()
    
  )
}

export default KeywordSearchContainer