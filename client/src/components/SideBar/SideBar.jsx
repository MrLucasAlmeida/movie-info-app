import React from 'react'
import './SideBar.css'
import SideBarButton from '../SideBarButton/SideBarButton.jsx'
import NetflixLogo from '../../images/Netflix-Logo.jpg'
import { useEffect, useState } from 'react'

import { getGenreList} from '../../functions/requestfunctions';

// import images
import genreIcons from '../../images/genres/index.js'

function SideBar({ setGenreTerm }) {
  
  async function getListOfGenres() {
    const response = await getGenreList();
    if (response == undefined) {
      return;
    }
    console.log('got the list of genres');
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
          <img src={NetflixLogo} alt="Netflix Logo"/>
        </div>



          {genreObjects?.length > 0 ? (
          genreObjects.map((genre, idx) => (
              <SideBarButton key={idx} text={genre.name} image={genreIcons[genre.name.toLowerCase()]} genreId={genre.id} setGenreTerm={setGenreTerm}></SideBarButton>
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