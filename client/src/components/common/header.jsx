import React from 'react'
import SelectTheme from '../common/themeSelector';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom'; 

import { BellDot } from "lucide-react"

function Header({isSidebarOpen, setIsSidebarOpen}) {

    const navigate = useNavigate(); // Initialize useNavigate hook
    const { logout } = useAuthStore(); // Get logout function from useAuthStore

    const handleLogout = async () => {
        await logout(navigate); // Call logout function and pass navigate
    };
    
  return (
    <div className='flex items-center justify-between gap-2  border-b px-8 py-2 '>


            <div>

            <label className="btn btn-ghost btn-circle swap swap-rotate">
  
                {/* this hidden checkbox controls the state */}
                <input onClick={() => setIsSidebarOpen(!isSidebarOpen)} type="checkbox" />
                
                {/* hamburger icon */}
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                
                {/* close icon */}
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                
                </label>


            </div>

       

            <div className='flex items-center gap-2'>
                        <div><SelectTheme/></div>


                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <BellDot />
                            </div>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow bg-base-100 rounded-box w-96">
                                <li className='border-b p-2'>New Message Received from the company</li>
                            </ul>
                            
                        </div>


                        {/* <div className="btn btn-ghost btn-circle avatar">
                                <a href="/settings"><Settings /></a> 
                        </div> */}


                        <div className='border border-l h-8'></div>
                        
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-9 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                <a href='/' className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                                </li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
            </div>
 
            
    </div>
  )
}

export default Header
