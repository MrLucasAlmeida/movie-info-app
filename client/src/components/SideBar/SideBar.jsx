import React from 'react'
import './SideBar.css'
import SideBarButton from '../SideBarButton/SideBarButton.jsx'
import PopFlix from '../../images/popflix-image.png'
import { useEffect, useState } from 'react'

import { getGenreList } from '../../functions/requestfunctions';

// import images
import genreIcons from '../../images/genres/index.js'

function SideBar({ setQueryTerm, setShowMovieList }) {
  
  async function getListOfGenres() {
    const response = await getGenreList();
    if (response == undefined) {
      return;
    }
    console.log('got the list of genres');
    console.log(response);
    setGenreObjects(response);
  }


  const [genreObjects, setGenreObjects] = useState([]);

  
  useEffect(() => {
    getListOfGenres();
  }, []);



  return (
    <div className='nav-bar'>
      



      <div className='scrollable-content-nav-bar'>
        <div className='nav-bar-logo-container'>
          <img src={PopFlix} alt="Netflix Logo"/>
        </div>
          {/* create non genre side bar button */}
          <SideBarButton  key='popular' text='Popular'
                              image={genreIcons['popular']}
                              id='popular'
                              ></SideBarButton>
          <SideBarButton  key='upcoming' text='Upcoming'
                              image={genreIcons['upcoming']}
                              id='upcoming'
                              ></SideBarButton>
          <SideBarButton  key='top rated' text='Top Rated'
                              image={genreIcons['top rated']}
                              id='top_rated'
                              ></SideBarButton>


          {genreObjects?.length > 0 ? (
          genreObjects.map((genre, idx) => (
              <SideBarButton  key={idx} text={genre.name}
                              image={genreIcons[genre.name.toLowerCase()]}
                              id={genre.id}
                              ></SideBarButton>
            )
          )
          ) : (
            <h1>No Genres</h1>
          )

          }
          
          
          

        </div>
    </div>
  )
}

export default SideBar