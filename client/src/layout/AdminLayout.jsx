import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Header from '../components/header'


function Layout() {
  return (
    <div className='flex flex-row w-screen h-screen'>
  
            <div><Sidebar/></div>
            
            <div className='flex-1'>
              <div><Header/></div>
              <div>{<Outlet/>}</div>
            </div>
          
    </div>
  )
}

export default Layout
