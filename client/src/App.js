import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Dashboard from './pages/dashboard';
// import Settings from './pages/settings';


import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './adminpages/admindashboard';

import SignUp from './auth/register';
import SignIn from './auth/login';
import Unauthorized from './pages/unauthorized';
import ProtectedRoute from './components/ProtectedRoute'; // Import the PrivateRoute component
import Forgotpassword from './auth/forgotpassword';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <div className='app'>
    <BrowserRouter>
      <Routes>

      {/* USER PATH */}
        <Route path="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Route>

      {/* ADMIN PATH */}
        <Route path="/" element={<AdminLayout />}>
          <Route
            path="/admindashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
        </Route>

        <Route index element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
        <Route path="/forbidden" element={<Unauthorized />}/>

      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
