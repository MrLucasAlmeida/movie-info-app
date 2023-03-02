import React from 'react'
import './FilmFlix.css'
import SideBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'
import { getMovieListByQuery, getGenreList, getMovieListbyGenre, getConfiguration } from '../../functions/requestfunctions';
import { useState, useEffect } from 'react'


function FilmFlix() {

  const [movies, setMovies] = useState([]);
  const [showMovieList, setShowMovieList] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [queryTerm, setQueryTerm] = useState(12);






  async function movieListQuery(query, pageNum) {
    let response = [];
    if (typeof query === 'number') {
      // doing search by genre id
      console.log('searching by genre id');
      response = await getMovieListbyGenre(query, pageNum);
    } else {
      // doing search by string
      console.log('searching by string');
      response = await getMovieListByQuery(query, pageNum);
    }
    
    // console.log(response);

    // check if the response contains a duplicate movie
    // let flag = false;
    // for (let i = 0; i < response.length; i++) {
    //   for (let j = 0; j < movies.length; j++) {
    //     if (response[i].id === movies[j].id) {
    //       return;
    //     }
    //   }
    // }
    // if (flag) {
    //   console.log("there was a duplicate movie");
    //   return;
    // }
    let newMoviesList = [...movies];

    console.log(newMoviesList);
    for (let i = 0; i < response.length; i++) {
      let flag = true;
      for (let j = 0; j < newMoviesList.length; j++) {
        if (response[i].id === newMoviesList[j].id) {
          console.log("there was a duplicate movie");
          flag = false;
          break;
        }
      }
      if (flag) {
        newMoviesList.push(response[i]);
      }
    }

    console.log(newMoviesList);
    // console.log(newMoviesList.length);

    setMovies(prevMovies => {
      // console.log([...prevMovies,...response]);
      return newMoviesList;
    });
    
    
  }

  async function movieListGenre(genreId, pageNum) {
    const response = await getMovieListbyGenre(genreId, pageNum);
    // console.log(response);
    // setMovies(response);
    
    
  }
  function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  }



  // const [ranOnce, setRanOnce] = useState(false);


  useEffect(() => {
    // movieListQuery(searchTerm);
    console.log('app loaded');
    setMovies([]);
    
  }, []);
  // useEffect(() => {
  //   movieListQuery(queryTerm, 1);
  // }, [queryTerm]);

  useEffect(() => {
    console.log("query term changed");
    setPageNumber(1);
    if (movies !== []) {
      setMovies([]);
    }
    // console.log("reset movies");
    movieListQuery(queryTerm, 1);
    
    
    
    
    let movieSec = document.querySelector('.scrollable-content-moviesection-container');
    movieSec.scrollTop = 0;



    // console.log(movies);
  }, [queryTerm]);

  useEffect(() => {
    if (pageNumber === 1) {return;}
    console.log("page number changed");
    movieListQuery(queryTerm,pageNumber);
    // have a loading bar that will always appear at the bottom
    // use a timeout to wait for movies
  }, [pageNumber]);

  
  



  return (
    <div className='filmflix-container'>
        <SideBar setQueryTerm={setQueryTerm} setShowMovieList={setShowMovieList}></SideBar>
        <MovieSection movies={movies}
        queryTerm={queryTerm}
        setQueryTerm={setQueryTerm}
        showMovieList={showMovieList}
        setShowMovieList={setShowMovieList}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        ></MovieSection>
    </div>
  )
}

export default FilmFlix