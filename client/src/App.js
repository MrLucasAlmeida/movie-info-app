import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import FilmFlix from './components/FilmFlix/FilmFlix.jsx';

import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <FilmFlix></FilmFlix>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
