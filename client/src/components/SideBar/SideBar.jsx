import React from 'react'
import './SideBar.css'
import SideBarButton from '../SideBarButton/SideBarButton.jsx'

function NavBar() {
  return (
    <div className='nav-bar'>
      <div className='scrollable-content-nav-bar'>
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
          
          <SideBarButton text='Action'></SideBarButton>
          <SideBarButton text='Thriller'></SideBarButton>
          <SideBarButton text='Horror'></SideBarButton>
          <SideBarButton text='Comedy'></SideBarButton>
          
          

        </div>
    </div>
  )
}

export default NavBar