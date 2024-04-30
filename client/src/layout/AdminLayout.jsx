import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import Header from '../components/common/header';
import PrivateRoute from '../components/helpers/PrivateRoute'; // Import your PrivateRoute component
import SessionTimeout from '../components/helpers/SessionTimeout';


function AdminLayout() {
  return (
    <div className='flex flex-row w-screen h-screen'>
      <div><Sidebar/></div>
      <div className='flex-1'>
        <div><Header/></div>
        <div>
          {/* Wrap the Outlet with the PrivateRoute component */}
          <PrivateRoute /> 
          <Outlet />
        </div>
      </div>

      <SessionTimeout />
    </div>
  );
}

export default AdminLayout;
