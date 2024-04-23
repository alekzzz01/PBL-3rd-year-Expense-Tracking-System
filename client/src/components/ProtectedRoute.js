import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Assuming you export useAuthStore from your authentication store file

const ProtectedRoute = ({ element, requiredRoles }) => {
  const user = useAuthStore(state => state.user);
  const token = localStorage.getItem('token');


  // Check if the token is present
  if (!token) {
    // Redirect to login page if token is not present
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required role
  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    // Redirect to unauthorized page if user does not have the required role
    return <Navigate to="/forbidden" replace />;
  }

  // Redirect based on user's role
  if (user && user.role === 'admin') {
    // Redirect to admin dashboard
    return <Navigate to="/admindashboard" replace />;
  } else {
    // Redirect to user dashboard (assuming this is the default layout)
    return element;
  }
};

export default ProtectedRoute;
