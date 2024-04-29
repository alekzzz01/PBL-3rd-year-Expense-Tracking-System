import React, {createContext, useContext, useState, useEffect} from 'react'
import { ChevronFirst, ChevronLast} from "lucide-react"
import { Link } from 'react-router-dom';
import { Sidebar_Links } from "../libs/navigation"
import { useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';



const SidebarContext = createContext();

export default function Sidebar() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
            try {
                const userData = await useAuthStore.getState().getUsernameAndEmail();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Call the fetchUserData function
        fetchUserData();
    }, []);

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        {/* <img src="https://unglobalcompact.org.au/wp-content/uploads/2023/10/MONEYME-logo.png" alt='logo' className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} /> */}
                        <p className={`text-2xl font-bold overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} >Company</p>
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 btn">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                            <ul className="flex-1 px-3 mt-8">
                            {Sidebar_Links.map(link => (
                                <SidebarItem
                                    key={link.key}
                                    icon={link.icon}
                                    text={link.label}
                                    active={isActive(link.path)}
                                    to={link.path}
                                />
                            ))}
                            </ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <img src="https://previews.123rf.com/images/urfandadashov/urfandadashov1809/urfandadashov180902667/109317646-profile-pic-vector-icon-isolated-on-transparent-background-profile-pic-logo-concept.jpg" alt='profile' className="w-10 h-10 rounded-md" />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                            
                     
                    <div className="leading-4">
                            {userData ? (
                                <div>
                                <h4 className="font-semibold">{userData.username}</h4>
                                <span className="text-xs text-gray-600">{userData.email}</span>
                                </div>
                            ) : (
                                <p>Loading user data...</p>
                            )}
                    </div>
                      
    
                   


                        </div>
                    </div>

                    
                </nav>
            </aside>
        </>
    )
}


export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext);
  
    return (
      <Link to={to} className="block">
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? 'font-semibold bg-base-300' : 'font-normal text-gray-500'}  hover:bg-base-200 `}>
          {icon}
          <a href className={`ml-3 ${expanded ? "" : "hidden"}`}>{text}</a>
  
          {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
            </div>
          )}
  
          {/* Display the tooltip only when not expanded */}
          {!expanded && (
            <div className={`absolute left-full rounded-md px-2 py-1 ml-6 text-sm invisible opacity-0 transition-all shadow-md group-hover:visible group-hover:opacity-100`}>
              {text}
            </div>
          )}
        </li>
      </Link>
    );
  }