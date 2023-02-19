import React from 'react'
import './FilmFlix.css'
import SideBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'
import { getMovieListByQuery, getGenreList, getMovieListbyGenre, getConfiguration } from '../../functions/requestfunctions';
import { useState, useEffect } from 'react'


function FilmFlix() {


  async function movieListQuery(query) {
    const response = await getMovieListByQuery(query);
    // console.log(response);
    setMovies(response);
    
  }

  async function movieListGenre(genreId, pageNum) {
    const response = await getMovieListbyGenre(genreId, pageNum);
    // console.log(response);
    // setMovies(response);
    setMovies(prevMovies => [...prevMovies, ...response]);
    
  }
  function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  }



  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('avenger');
  const [genreTerm, setGenreTerm] = useState(12);
  const [showMovieList, setShowMovieList] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // movieListQuery(searchTerm);
    
  }, []);

  useEffect(() => {
    movieListQuery(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    movieListGenre(genreTerm,pageNumber);
    setMovies([]);
    setPageNumber(1);
    let movieSec = document.querySelector('.scrollable-content-moviesection-container');
    movieSec.scrollTop = 0;
  }, [genreTerm]);

  useEffect(() => {
    setIsLoading(true);
    movieListGenre(genreTerm,pageNumber);
    // have a loading bar that will always appear at the bottom
    // use a timeout to wait for movies
    setIsLoading(false);



  }, [pageNumber]);
  



  return (
    <div className='filmflix-container'>
        <SideBar setGenreTerm={setGenreTerm} setShowMovieList={setShowMovieList}></SideBar>
        <MovieSection movies={movies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showMovieList={showMovieList}
        setShowMovieList={setShowMovieList}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        ></MovieSection>
    </div>
  )
}

export default FilmFlix