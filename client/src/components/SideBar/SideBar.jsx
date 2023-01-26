import React from 'react'
import './SideBar.css'
import SideBarButton from '../SideBarButton/SideBarButton.jsx'
import NetflixLogo from '../../images/Netflix-Logo.jpg'

function NavBar({ setMovies }) {
  return (
    <div className='nav-bar'>
      



      <div className='scrollable-content-nav-bar'>
        <div className='nav-bar-logo-container'>
          <img src={NetflixLogo} alt="Netflix Logo"/>
        </div>



          <SideBarButton text='WOWOW'></SideBarButton>
          <SideBarButton text='Thriller'></SideBarButton>
          <SideBarButton text='Horror'></SideBarButton>
          <SideBarButton text='Comedy'></SideBarButton>

          <SideBarButton text='Action'></SideBarButton>
          <SideBarButton text='Thriller'></SideBarButton>
          <SideBarButton text='Horror'></SideBarButton>
          <SideBarButton text='Comedy'></SideBarButton>
          
          <SideBarButton text='Action'></SideBarButton>
          <SideBarButton text='Thriller'></SideBarButton>
          <SideBarButton text='Horror'></SideBarButton>
          <SideBarButton text='Comedy'></SideBarButton>
          
          <SideBarButton text='Action'></SideBarButton>
          <SideBarButton text='Thriller'></SideBarButton>
          <SideBarButton text='Horror'></SideBarButton>
          <SideBarButton text='Comedy'></SideBarButton>
          
          

        </div>
    </div>
  )
}

export default NavBar