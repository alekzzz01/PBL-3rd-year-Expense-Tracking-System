import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import SetupBudget from './pages/setupBudget';
import Expenses from './pages/expenses';
import Analytics from './pages/analytics';
import Notifications from './pages/notifications';
import Settings from './pages/settings';


import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './adminpages/admindashboard';

import SignUp from './auth/register';
import SignIn from './auth/login';
import Unauthorized from './pages/unauthorized';



import Forgotpassword from './auth/forgotpassword';

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
        <Route path="/forbidden" element={<Unauthorized />}/>

      {/* USER LAYOUT */}
        <Route path="/" element={<Layout />}>

            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/setup" element={<SetupBudget/>} />
            <Route path="/expenses" element={<Expenses/>} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/notifications" element={<Notifications/>} />
            <Route path="/settings" element={<Settings/>} />
        


        </Route>

      
      {/* ADMIN LAYOUT */}
        <Route path="/" element={<AdminLayout />}>
    
          <Route path="/home" element={<AdminDashboard/>} />

        </Route>

       

      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
