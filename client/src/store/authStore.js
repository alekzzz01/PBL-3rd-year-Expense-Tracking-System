  import { create } from 'zustand';
  import { jwtDecode } from "jwt-decode";
  import axios from 'axios';

  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


  const useAuthStore = create((set) => ({

    
    isAuthenticated: false,
    user: null,
    usernameExists: false,

    initializeUserFromLocalStorage: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Fetch user role from the server
        try {
          const role = await useAuthStore.getState().getUserRole();
          // Redirect based on user's role
          if (role === "admin" && window.location.pathname !== '/admindashboard') {
            window.location.href = '/admindashboard';
          } else if (role !== "admin" && window.location.pathname !== '/dashboard') {
            window.location.href = '/dashboard';
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Handle error fetching user role or redirect to login page
          // For example:
          window.location.href = '/login';
        }
      }
    },
    

    
    login: async (email, password) => {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          email,
          password,
        });
  
        const { status, message, userId, lastLogin, username , role, token } = response.data;
          if (status) {
            // Login successful
            set({
              isAuthenticated: true,
              user: {
                userId,
                lastLogin,
                username,
                email,
                role,
                token
              }
            });
    
            localStorage.setItem('token', token);
            localStorage.setItem('IsLoggedIn', true)
          
            
        
            // Redirect based on role
            if (role === "admin") {
              window.location.href = '/admindashboard';
            } else {
              window.location.href = '/dashboard';
            }
    
            toast.success('Login successful');

            

          } else {
            // Login failed
            console.error('Login failed:', message);
            return message;
          }
    
     
      } catch (error) {
        console.error('Network error:', error);
        return `Network error: ${error}`;
      }
    },
    



    register: async (username, email, password) => {
      try {
        const response = await axios.post('http://localhost:5000/auth/register', {
          username,
          email,
          password,
        });
    
        if (response.status === 200) {
          const user = response.data;
          set({ isAuthenticated: true, user });
          return { success: true }; // Registration successful
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false }; // Registration failed
        }
        
      } catch (error) {
        if (error.response) { 
          // Server responded with an error status
          if (error.response.status === 400) {
            // Bad Request - Display error message from the server
            console.error('Registration error:', error.response.data.message);
            return { success: false, errorMessage: error.response.data.message }; // Registration failed
          } else {
            console.error('Unexpected response status:', error.response.status);
            return { success: false, errorStatusMessage: error.response.data.message };
          }
        } else if (error.request) {
          // Request made but no response received
          console.error('No response received from the server');
        } else {
          // Something else went wrong
          console.error('Error:', error.message);
        }
        return { success: false }; // Registration failed
      }
    },
    

    logout: async (navigate) => {
      try {
          // Retrieve token from local storage
          const token = localStorage.getItem('token');

          if (!token) {
              // Token not found, handle as needed (e.g., redirect to login)
              console.error("Token not found. Cannot log out.");
              return;
          }

          const response = await axios.post('http://localhost:5000/auth/logout', {}, {
              headers: {
                  Authorization: `Bearer ${token}` // Include token in Authorization header
              }
          });

          if (response.status === 200) {
              // Logout successful
              set({ isAuthenticated: false, user: null });
              localStorage.removeItem('token');
              localStorage.removeItem('IsLoggedIn')
              localStorage.removeItem('role'); 
              toast.success('Logged out successfully');
              navigate('/login'); // Redirect to login page
          } else {
              // Handle logout error
              console.error("Logout failed:", response.statusText);
          }
      } catch (error) {
          // Handle network error or other exceptions
          console.error("Logout error:", error.message);
      }

    },

    checkUsernameExists: async (username) => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/check-username/${username}`);
        set({ usernameExists: response.data.exists });
      } catch (error) {
        console.error('Error checking username:', error);
        set({ usernameExists: false }); // Reset usernameExists state in case of error
      }
    },


    getUserRole: async () => {
      const token = localStorage.getItem('token');
      if (token) {
          const payLoad = jwtDecode(token);
          console.log('Role retrieved:', payLoad?.role); // Log the retrieved role
          return payLoad?.role;
      }
    },


    getUsernameAndEmail: async () => {
      const token = localStorage.getItem('token');
      if(token) {
        const payLoad = jwtDecode(token);
        // console.log('Role retrieved', payLoad?.username, payLoad?.email);
        return { username: payLoad?.username, email: payLoad?.email };
      }
    },
    


    isLoggedIn: async () => {
        const token = localStorage.getItem('token'); // Retrieves the token from localStorage
        if(token){
            const payLoad = jwtDecode(token); // Decodes the JWT token to extract payload
            const isLogin = Date.now() < payLoad.exp * 1000; // Checks if the token expiration time (in milliseconds) is in the future
            return isLogin; // Returns true if the token is not expired, otherwise false
        }
    },

    
    
    





  }));

  useAuthStore.getState().initializeUserFromLocalStorage();

  export default useAuthStore;
