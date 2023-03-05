import React from 'react'
import SearchIcon from '../../images/search.svg'
import './SearchBar.css'

function SearchBar({ queryTerm, setQueryTerm, setShowMovieList }) {

  function handleSearch(e) {
    if (e.keyCode !== 13) {return;}
    setQueryTerm('%keyword:'+e.target.value);
    setShowMovieList(true);
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