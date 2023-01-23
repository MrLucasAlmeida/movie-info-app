import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getMovieListByQuery, getGenreList, getMovieListbyGenre, getConfiguration } from './functions/requestfunctions';



function App() {

  useEffect(() => {
    getMovieListByQuery('star wars');
    // getGenreList();
    // getMovieListbyGenre(28);
    // getMovieListbyGenre(12);
    // getMovieListbyGenre(28);

    // getConfiguration();
  },[]);



  


  return (
    <div className="App">
      <h1>Hello WOW</h1>
      <img src={"https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"} alt="logo" ></img>
    </div>
  );
}

export default App;
