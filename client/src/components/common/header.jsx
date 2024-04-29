import React from 'react'
import SelectTheme from '../common/themeSelector';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom'; 

import { BellDot,  Menu } from "lucide-react"

function Header({toggleSidebar}) {

    const navigate = useNavigate(); // Initialize useNavigate hook
    const { logout } = useAuthStore(); // Get logout function from useAuthStore

    const handleLogout = async () => {
        await logout(navigate); // Call logout function and pass navigate
    };
    
  return (
    <div className='flex items-center justify-between gap-2  border-b px-8 py-2 '>


            <div>
                <button onClick={() => toggleSidebar(true)} className='btn btn-ghost btn-circle sm:block md:block lg:hidden'>
                    <Menu />
                </button>    
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
