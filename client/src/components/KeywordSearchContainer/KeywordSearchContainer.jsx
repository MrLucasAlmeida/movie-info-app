import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieListByKeyword } from '../../functions/requestfunctions';
import MovieList from '../MovieList/MovieList.jsx';


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
        
        let newMoviesList = [...movieList,...response];

        newMoviesList = newMoviesList.filter((movie, index) => {
            return newMoviesList.indexOf(movie) === index;
        });

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
        if (pageNum === 1) {
            console.log(response);
            setMovieList(response);
        } else {
            console.log(newMoviesList);
            setMovieList(newMoviesList);
        }
        setIsLoading(false);
    }


    function handleInfiniteScroll() {
        let movieSec = document.querySelector('.scrollable-content-moviesection-container');
        if (movieSec.scrollTop + movieSec.clientHeight + 1 >= movieSec.scrollHeight) {
          console.log('bottom of page in keywordSearchContainer');
          setPageNumber(prevPageNumber => prevPageNumber + 1);
          console.log(pageNumber);
        }
      }








    // useEffect(() => {
        
    

        
    //   }, []);

    useEffect(() => {

        //   add eventlistener for infinite scrolling
        const scrollContainer = document.getElementsByClassName('scrollable-content-moviesection-container')[0];
        scrollContainer.addEventListener('scroll', handleInfiniteScroll);

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
        // console.log(pageNumber);
        // have a loading bar that will always appear at the bottom
        // use a timeout to wait for movies
        console.log(movieList);
      }, [pageNumber]);

  return (
    <MovieList movies={movieList} />
  )
}

export default KeywordSearchContainer