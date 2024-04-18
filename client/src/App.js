import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout'


import Dashboard from './pages/dashboard';
import Settings from './pages/settings';

import SignUp from './auth/register';
import SignIn from './auth/login';

function App() {
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []); 


  return (
    
    <div className='app'>

        <BrowserRouter>

              <Routes>

                {/* Main layout With Sidebar and Outlet - Layout.jsx */}
                <Route path='/' element={<Layout />} >  
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/settings' element={<Settings />} />
                </Route>

                <Route>
                  <Route index element={<SignIn />} />
                  <Route path='/login' element={<SignIn />} />
                  <Route path='/register' element={<SignUp />} />
                </Route>

                

              </Routes>
              
        </BrowserRouter>


    </div>
  )
}

export default App
