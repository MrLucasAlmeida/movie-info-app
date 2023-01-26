import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getMovieListByQuery, getGenreList, getMovieListbyGenre, getConfiguration } from './functions/requestfunctions';
import FilmFlix from './components/FilmFlix/FilmFlix.jsx';


function App() {


    return (
    <div className="App">
      <FilmFlix></FilmFlix>
    </div>
  );
}

export default App;
