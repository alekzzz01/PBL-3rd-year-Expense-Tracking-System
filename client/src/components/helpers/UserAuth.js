import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';


const UserAuth = () => {


    useEffect(() => {
        useAuthStore.getState().isLoggedIn();
      }, []);

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

   
   

};

export default UserAuth;
