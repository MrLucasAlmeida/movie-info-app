import React from 'react'
import SearchIcon from '../../images/search.svg'
import './SearchBar.css'

import { useNavigate } from 'react-router';


function SearchBar({ queryTerm, setQueryTerm, setShowMovieList }) {


  const navigate = useNavigate();

  function handleSearch(e) {
    if (e.keyCode !== 13) {return;}

    if (e.target.value === '') return;
    
    // window.location.href = `/search/${e.target.value}`;
    navigate(`/search/${e.target.value}`);

  }
  



  return (
    <div className="search">
        <input
          placeholder='Search All Movies'
          id='search-bar'
          onKeyDown={handleSearch}
        />
        <img
          src={SearchIcon}
          alt='search icon'
          onClick={() => {setQueryTerm('%keyword:'+document.getElementById('search-bar').value);setShowMovieList(true);}}
        />
      </div>
  )
}

export default SearchBar