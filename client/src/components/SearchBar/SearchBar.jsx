import React from 'react'
import SearchIcon from '../../images/search.svg'
import './SearchBar.css'

import { useNavigate } from 'react-router';


function SearchBar({ queryTerm, setQueryTerm, setShowMovieList }) {


  const navigate = useNavigate();

  function handleEnterSearch(e) {
    if (e.keyCode !== 13) {return;}

    if (e.target.value === '') return;
    
    // window.location.href = `/search/${e.target.value}`;
    navigate(`/search/${e.target.value}`);
  }

  function handleSearchIconClick() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar.value === '') return;
    navigate(`/search/${searchBar.value}`);
  }
  



  return (
    <div className="search">
        <input
          placeholder='Search All Movies'
          id='search-bar'
          onKeyDown={handleEnterSearch}
        />
        <img
          src={SearchIcon}
          alt='search icon'
          onClick={handleSearchIconClick}
        />
      </div>
  )
}

export default SearchBar