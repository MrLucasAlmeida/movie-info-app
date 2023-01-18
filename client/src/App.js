import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';



function App() {

  useEffect(() => {
    checkAPI();
  },[]);



  async function checkAPI() {

    const response = await fetch('http://localhost:5000/genres', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return response.ok ? data.genreList : data.err;



    if (response.ok) {
      const data = await response.json();
      console.log(data.genreList);
      
    } else {
      const err = await response.json();
      console.log(err);
      console.log("ERROR");
    }
  }


  return (
    <div className="App">
      <h1>Hello WOW</h1>
    </div>
  );
}

export default App;
