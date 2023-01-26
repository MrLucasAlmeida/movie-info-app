import React from 'react'
import SearchIcon from '../../images/search.svg'
import './SearchBar.css'

function SearchBar() {
  return (
    <div className="search">
        <input
          placeholder='Search All Movies'
          value={'superman'}
        //   onChange={(e) => setSearchTerm(e.target.value)}
          // onSubmit={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search icon'
        //   onClick={() => movieSearch(searchTerm)}
        />
      </div>
  )
}

export default SearchBar