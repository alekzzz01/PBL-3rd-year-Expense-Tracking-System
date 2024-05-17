import React from "react";
import { Outlet } from 'react-router-dom';
// import Sidebar from '../admincomponents/adminsidebar';
import Navbar from '../admincomponents/adminheader';
import PrivateRoute from '../components/helpers/PrivateRoute'; // Import your PrivateRoute component
import SessionTimeout from '../components/helpers/SessionTimeout';
import { useNavigate } from 'react-router-dom';


function AdminLayout() {

  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };



  return (
 

    <>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
              <Navbar/>
              <PrivateRoute /> 
              <Outlet />

             
        </div>

        <div className="drawer-side">
        
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-60 min-h-full border-r border-base-200 text-base-content">

              <img src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/440864325_346224308474974_6359235480973778937_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHIt5B4k375UleDKn1GgV7jHQZJq3po0xwdBkmremjTHM-vPXe_pMAVPpMZ8yFe9wwAGErdZAz_Otk4fdN7M3PU&_nc_ohc=1v7qZe3lq_0Q7kNvgEbduVD&_nc_ht=scontent.fmnl30-1.fna&oh=03_Q7cD1QGhNR71L_khz38GwpxfqxW8PBBXuzeah0Nb0pgGOkEesg&oe=66658FD7" className="mb-8" alt="" />
              <li>
                <h2 className="menu-title">Dashboard</h2>
                <ul>
                  <li><button onClick={() => handleNavigation('/home')}>Home</button></li>
                  <li><button onClick={() => handleNavigation('/users')}>User Management</button></li>
                  <li><button onClick={() => handleNavigation('/eventlogs')}>Event Logs</button></li>
                
                </ul>
              </li>

              <li>

              <h2 className="menu-title">Settings</h2>
                <ul>
                  <li><button>Notification</button></li>
                  <li><button>Profile</button></li>
                
                </ul>
            
              </li>
          </ul>


        </div>


      </div>

      <SessionTimeout />

    </>
  );
}

export default AdminLayout;
