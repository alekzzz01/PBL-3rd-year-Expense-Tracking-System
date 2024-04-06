import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Dashboard from './pages/dashboard';

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

                  <Route>
                          <Route path='/' element={<SignIn />} />
                          <Route path='/login' element={<SignIn />} />
                          <Route path='/register' element={<SignUp />} />
                          <Route path='/dashboard' element={<Dashboard />} />
                  </Route>

              </Routes>
              
        </BrowserRouter>


    </div>
  )
}

export default App
