import React from 'react'
import './FilmFlix.css'
import SideBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'
import { getMovieListByQuery, getGenreList, getMovieListbyGenre, getConfiguration } from '../../functions/requestfunctions';
import { useState, useEffect } from 'react'


function FilmFlix() {


  async function movieListQuery(query) {
    const response = await getMovieListByQuery(query);
    console.log(response);
    setMovies(response);
    
  }

  async function movieListGenre(genreId) {
    const response = await getMovieListbyGenre(genreId);
    console.log(response);
    setMovies(response);
    
  }



  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreTerm, setGenreTerm] = useState('');


  useEffect(() => {
    // movieListQuery(searchTerm);
  }, []);

  useEffect(() => {
    console.log('fetched movies by query');
    // movieListQuery(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    console.log('fetched movies by genres');
    // movieListGenre(genreTerm);
  }, [genreTerm]);
  



  return (
    <div className='filmflix-container'>
        <SideBar setGenreTerm={setGenreTerm}></SideBar>
        <MovieSection movies={movies} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></MovieSection>
    </div>
  )
}

export default FilmFlix