import React from 'react';
import { Navigate } from 'react-router-dom';
// import useAuthStore from '../../store/authStore';

const PrivateRoute = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    // const [userRole, setUserRole] = useState(null);

    // useEffect(() => {
    //     // Fetch the user's role when the component mounts
    //     const fetchUserRole = async () => {
    //         try {
    //             const role = await useAuthStore.getState().getUserRole();
    //             setUserRole(role);
    //         } catch (error) {
    //             // Handle error fetching user role
    //             console.error("Error fetching user role:", error);
    //             // Redirect to login page if there's an error
    //             // or handle it according to your application logic
    //         }
    //     };

    //     fetchUserRole();
    // }, []);



    // // If user role is not yet fetched, return null or a loading indicator
    // if (userRole === null) {
    //     return null; // or return a loading indicator
    // }

    // // Add your authorization logic here based on the fetched user role
    // if (userRole !== "admin") {
    //     return <Navigate to="/forbidden" />;
    // }
   
   

};

export default PrivateRoute;
