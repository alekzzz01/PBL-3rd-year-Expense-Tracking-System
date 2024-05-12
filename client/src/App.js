import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import Income from './pages/setupBudget';
import Expenses from './pages/expenses';
import Analytics from './pages/analytics';
import Profile from './pages/Profile';
import Notifications from './pages/notifications';
import Settings from './pages/settings';


import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './adminpages/admindashboard';
import AdminUserManagement from './adminpages/userManagement';

import SignUp from './auth/register';
import SignIn from './auth/login';
import Unauthorized from './pages/unauthorized';



import Forgotpassword from './auth/forgotpassword';
import Resetpassword from './auth/resetpassword';

function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);



  return (
    <div className='app'>
    <BrowserRouter>
      <Routes>

        <Route index element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
        <Route path="/resetpassword/:token" element={<Resetpassword/>}></Route>

        <Route path="/forbidden" element={<Unauthorized />}/>

      {/* USER LAYOUT */}
        <Route path="/" element={<Layout />}>

            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/income" element={<Income/>} />
            <Route path="/expenses" element={<Expenses/>} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/notifications" element={<Notifications/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/profile" element={<Profile/>} />
        


        </Route>

      
      {/* ADMIN LAYOUT */}
        <Route path="/" element={<AdminLayout />}>
    
          <Route path="/home" element={<AdminDashboard/>} />
          <Route path="/users" element={<AdminUserManagement/>} />

        </Route>

       

      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
