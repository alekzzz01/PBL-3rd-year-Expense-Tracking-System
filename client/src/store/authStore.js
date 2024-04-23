import { create } from 'zustand';
import axios from 'axios';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  usernameExists: false,


      login: async (username, password) => {
        try {
          const response = await axios.post('http://localhost:5000/auth/login', {
            username,
            password,
          });

          if (response.status === 200) {
            const { status, message, userId, lastLogin, email, role, token } = response.data;
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
              toast.success('Login successful');

            } else  {
              // Login failed
              console.error('Login failed:', message);
      
              return message;
            }

          } else {
            console.error('Unexpected response status:', response.status);
            // Show error toast
            // toast.error(`Unexpected response status: ${response.status}`);
            return `Unexpected response status: ${response.status}`;
          }

        } catch (error) {
          console.error('Network error:', error);
          // Show error toast
          // toast.error(`Network error: ${error}`);
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
            localStorage.removeItem('token'); // Remove token from local storage
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


  
}));

export default useAuthStore;
