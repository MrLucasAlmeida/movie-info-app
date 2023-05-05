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
        // set page to laoding
        // setIsLoading(true);
        // fetch movies by genre id
        setIsLoading(true);
        let response = await getMovieListbyGenre(genreId, pageNum);
        
        setMovieList(response);
        setIsLoading(false);
        // newMoviesList = newMoviesList.filter((movie, index) => {
        //     return newMoviesList.indexOf(movie) === index;
        // });

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
        // setIsLoading(false);
    }


    // function handleInfiniteScroll() {
    //     let movieSec = document.querySelector('.scrollable-content-moviesection-container');
    //     if (movieSec.scrollTop + movieSec.clientHeight + 1 >= movieSec.scrollHeight) {
    //       console.log('bottom of page');
    //       setPageNumber(prevPageNumber => prevPageNumber + 1);

    //       // move scroll back up a little bit
    //       movieSec.scrollTop -= 100;
    //     }
    //   }


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
        // movieListQuery(searchTerm);
        // console.log('app loaded');
        // setMovies([]);


        // add eventlistener for infinite scrolling
        // const scrollContainer = document.getElementsByClassName('scrollable-content-moviesection-container')[0];
        // scrollContainer.addEventListener('scroll', handleInfiniteScroll);

        // scroll to top of page
        // scrollContainer.scrollTop = 0;


        console.log('genre id changed');
        if (pageNumber === 1) {
          loadMovieListbyGenre(genreId, 1);
        }
        setPageNumber(1);
        
        
        
      }, [genreId]);


    useEffect(() => {
        // if (pageNumber === 1) {console.log('on first page');return;}
        console.log("page number changed");
        loadMovieListbyGenre(genreId, pageNumber);
        console.log('page number: ' + pageNumber);
        
        // scroll to the top of the page
        let scrollContainer = document.querySelector('.scrollable-content-moviesection-container');
        scrollContainer.scrollTop = 0;

      }, [pageNumber]);

  return (
    displayMovies()
  )
}

export default GenreContainer