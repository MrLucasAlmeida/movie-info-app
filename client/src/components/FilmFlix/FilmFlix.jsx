import React from 'react'
import './FilmFlix.css'
import SideBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'
import { getMovieListByQuery, getGenreList, getMovieListbyGenre, getConfiguration } from '../../functions/requestfunctions';
import { useState, useEffect } from 'react'


function FilmFlix() {


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
    // let newMoviesList = [...movies];
    // console.log(newMoviesList);
    // for (let i = 0; i < response.length; i++) {
    //   if (!newMoviesList.includes(response[i])) {
    //     newMoviesList.push(response[i]);
    //   }
    // }
    // console.log(response);
    if (!ranOnce) {
      setMovies(response);
    } else {
      setMovies(prevMovies => {
        const newMovies = [...prevMovies, ...response];
        console.log(newMovies);
        return newMovies;
      });
    }
    
    
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



  const [movies, setMovies] = useState([]);
  const [showMovieList, setShowMovieList] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [queryTerm, setQueryTerm] = useState(12);
  const [ranOnce, setRanOnce] = useState(false);


  useEffect(() => {
    // movieListQuery(searchTerm);
    console.log('app loaded');
    // setMovies([]);
    movieListQuery(queryTerm,1);
    setRanOnce(true);
    
  }, []);
  // useEffect(() => {
  //   movieListQuery(queryTerm, 1);
  // }, [queryTerm]);

  useEffect(() => {
    if (!ranOnce) return;
    console.log("query term changed");
    setPageNumber(1);
    setMovies([]);
    movieListQuery(queryTerm,pageNumber);
    let movieSec = document.querySelector('.scrollable-content-moviesection-container');
    movieSec.scrollTop = 0;



    console.log(movies);
  }, [queryTerm]);

  useEffect(() => {
    if (!ranOnce) return;
    console.log("page number changed");
    setIsLoading(true);
    movieListQuery(queryTerm,pageNumber);
    // have a loading bar that will always appear at the bottom
    // use a timeout to wait for movies
    setIsLoading(false);
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