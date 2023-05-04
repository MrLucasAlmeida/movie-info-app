import React from 'react'
import './FilmFlix.css'
import SideBar from '../SideBar/SideBar.jsx'
import MovieSection from '../MovieSection/MovieSection.jsx'
import { getMovieListByKeyword, getGenreList, getMovieListbyGenre, getConfiguration, getMovieListbyCategory, getMovieListbyPerson, getPersonDetails } from '../../functions/requestfunctions';
import { useState, useEffect } from 'react'


//https://filmpire.netlify.app/

function FilmFlix() {

  const [movies, setMovies] = useState([]);
  const [showMovieList, setShowMovieList] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [queryTerm, setQueryTerm] = useState('%category:upcoming');






  async function movieListQuery(query, pageNum) {
    setIsLoading(true);
    let response = [];
    if (query.includes('%genre')) {

      // doing search by genre id
      const genreId = parseInt(query.split(':')[1]);
      // console.log('searching by genre id');
      response = await getMovieListbyGenre(genreId, pageNum);


    } else if (query.includes('%category')) {

      // doing search by category
      // console.log('searching by category');
      const category = query.split(':')[1];
      response = await getMovieListbyCategory(category, pageNum);
    } else if (query.includes('%keyword')) {
      // doing search by keyword
      const keyword = query.split(':')[1];
      response = await getMovieListByKeyword(keyword, pageNum);
    } else if (query.includes('%person')) {
      // doing search by person
      const personId = query.split(':')[1];
      response = await getMovieListbyPerson(personId, pageNum);
    } else {
      // doing search by string
      // console.log('searching by string');
      response = await getMovieListByKeyword('superman', pageNum);
    }
    
    let newMoviesList = [...movies];

    for (let i = 0; i < response.length; i++) {
      let flag = true;
      for (let j = 0; j < newMoviesList.length; j++) {
        if (response[i].id === newMoviesList[j].id) {
          console.log("there was a duplicate movie");
          flag = false;
          break;
        }
      }
      if (flag) {
        newMoviesList.push(response[i]);
      }
    }

    if (pageNum === 1) {
      console.log(response);
      setMovies(response);
    } else {
      console.log(newMoviesList);
      setMovies(newMoviesList);
    }
    setIsLoading(false);

    
    
  }

  async function movieListGenre(genreId, pageNum) {
    const response = await getMovieListbyGenre(genreId, pageNum);
    // console.log(response);
    // setMovies(response);
    
    
  }



  useEffect(() => {
    // getConfiguration();
  }, []);



  return (
    <div className='filmflix-container'>
        <SideBar setQueryTerm={setQueryTerm} setShowMovieList={setShowMovieList}></SideBar>
        <MovieSection movies={movies}
        queryTerm={queryTerm}
        setQueryTerm={setQueryTerm}
        showMovieList={showMovieList}
        setShowMovieList={setShowMovieList}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        pageNumber={pageNumber}
        ></MovieSection>
    </div>
  )
}

export default FilmFlix