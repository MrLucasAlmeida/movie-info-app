import React from 'react'
import SearchIcon from '../../images/search.svg'
import './SearchBar.css'

function SearchBar({ queryTerm, setQueryTerm }) {


  



  return (
    <div className="search">
        <input
          placeholder='Search All Movies'
          // value={'superman'}
          id='search-bar'
          // onChange={(e) => setQueryTerm(e.target.value)}
          onSubmit={(e) => setQueryTerm(e.target.value)}
          onKeyDown={(e) => {e.keyCode === 13 && setQueryTerm(e.target.value)}}
        />
        <img
          src={SearchIcon}
          alt='search icon'
          onClick={() => setQueryTerm(document.getElementById('search-bar').value)}
        />
      </div>
  )
}

export default SearchBar