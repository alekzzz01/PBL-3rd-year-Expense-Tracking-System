  import { create } from 'zustand';
  import { jwtDecode } from "jwt-decode";
  import axios from 'axios';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { baseUrl } from '../store/url.js';


  const useAuthStore = create((set) => ({

    
    isAuthenticated: false,
    user: null,
    allUsers: [],
    usernameExists: false,
    totalUserPerMonth: [], 
    totalRegisteredUsers: 0,
    

  
    // for automatic login it checks if the user is already logged in
    initializeUserFromLocalStorage: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Fetch user role from the server
        try {
          const role = await useAuthStore.getState().getUserRole();
          // Redirect based on user's role
          if (role === "admin" && window.location.pathname !== '/home') {
            window.location.href = '/home';
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
        const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
        console.log('Login response:', response.data); // Log the response data
        if (response.status === 200) {
          const { status, message, otpToken } = response.data;
          if (status) {
            // Login successful
            localStorage.setItem('otpToken', otpToken);
            set({ isAuthenticated: true });
            toast.success('Login successful');
            window.location.href = '/verifyotp';
          } else {
            // Login failed
            console.error('Login failed:', message);
            toast.error(message);
          }
        } else {
          console.error('Unexpected response status:', response.status);
          toast.error('Unexpected error occurred');
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
          console.log('Login error response data:', error.response.data); // Log the response data
          const { status, message } = error.response.data;
    
          if (!status && message) {
            // Specific error handling based on the message from the server
            switch (message) {
              case 'User is not registered':
                toast.error('User is not registered. Please register to continue.');
                break;
              case 'Account is locked. Please reset your password.':
                toast.error('Account is locked due to multiple failed attempts. Please reset your password.');
                break;
              case 'Password is incorrect':
                toast.error('Password is incorrect. Please try again.');
                break;
              default:
                toast.error(message);
                break;
            }
          } else {
            // Handle other error scenarios
            toast.error('Login failed');
          }
        } else {
          // Handle other types of errors
          toast.error('Login failed');
        }
      }
    },
    

    


    verifyOTP: async (otp) => {
      try {
        const otpToken = localStorage.getItem('otpToken');
        if (!otpToken) {
          throw new Error('OTP token not found');
        }
  
        const response = await axios.post(`${baseUrl}/auth/verifyotp`, { otp }, {
          headers: { Authorization: `Bearer ${otpToken}` },
        });
  
        if (response.status === 200) {
          const { status, message, userId, lastLogin, username, email, role, token } = response.data;
          if (status) {
            // OTP verification successful
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
            localStorage.removeItem('otpToken');
  
            // Redirect logic based on role
            if (role === 'admin') {
              window.location.href = '/home';
            } else {
              window.location.href = '/dashboard';
            }
  
            toast.success('Login successful');
          } else {
            // OTP verification failed
            console.error('OTP verification failed:', message);
            toast.error(message);
          }
        } else {
          console.error('Unexpected response status:', response.status);
          toast.error('Unexpected error occurred');
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        toast.error('OTP verification failed');
      }
    },

    



    register: async (username, email, password) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/register`, {
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
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('No token found');
          }
  
          const response = await axios.post(`${baseUrl}/auth/logout`, null, {
              headers: { Authorization: `Bearer ${token}` },
          });
  
          // Log the response status code
          console.log('Logout response status code:', response.status);
  
          set({ isAuthenticated: false, user: null });
          localStorage.removeItem('token');
          toast.success('Logged out successfully');
          navigate('/login'); // Redirect to login page
      } catch (error) {
          console.error('Logout failed:', error);
          // Handle error if needed
          toast.error('Logout failed');
      }
  },
  
  
  
  

    checkUsernameExists: async (username) => {
      try {
        const response = await axios.get(`${baseUrl}/auth/check-username/${username}`);
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
      
        return { username: payLoad?.username, email: payLoad?.email };
      }
    },
    


    isLoggedIn: () => {
      const token = localStorage.getItem('token');
      if (token) {
        const payLoad = jwtDecode(token);
        const isExpired = Date.now() >= payLoad.exp * 1000;
        if (isExpired) {
          localStorage.removeItem('token');
          set({ isAuthenticated: false });
          alert('Session Expired.');
          window.location.href = '/login';
          return false;
        }
        set({ isAuthenticated: true });
        console.log('User authenticated');
        return true;
      }
      console.log('No token found, user not authenticated');
      alert('Please log in to access this page.');
      window.location.href = '/login';
      set({ isAuthenticated: false });
      return false;
    },
    


    // Admin Private route, user can't access Admin routes

    checkAdminAccess: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Fetch user role from the server
        try {
          const role = await useAuthStore.getState().getUserRole();
          // Redirect if the user is not an admin
          if (role !== "admin") {
            window.location.href = '/forbidden';
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        
          window.location.href = '/login';
        }
      }
    },

    forgotPassword: async (email) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/forgetPassword`, { email });
  
        if (response.status === 200) {
          toast.success('Password reset email sent successfully. Check your inbox.');
          return { success: true };
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false, errorMessage: 'Failed to send reset password email' };
        }
      } catch (error) {
        console.error('Error sending reset password email:', error);
        if (error.response && error.response.status === 404) {
          return { success: false, errorMessage: 'User not found' };
        } else {
          return { success: false, errorMessage: 'Failed to send reset password email' };
        }
      }
    },

    resetPassword: async (token, newPassword, confirmPassword) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/resetpassword/${token}`, {
          newPassword,
          confirmPassword,
        });
    
        if (response.status === 200) {
          toast.success('Password reset successfully');
          return { success: true };
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false, errorMessage: 'Failed to reset password' };
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        if (error.response && error.response.status === 400) {
          return { success: false, errorMessage: error.response.data.message };
        } else {
          return { success: false, errorMessage: 'Failed to reset password' };
        }
      }
    },


    
    updateUserProfile: async (firstName, lastName, bio) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await axios.put(
          `${baseUrl}/auth/updateprofile`,
          { firstName, lastName, bio },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 200) {
          const updatedUser = response.data.user;
          set({ user: updatedUser });
          toast.success('Profile updated successfully');
          return { success: true, user: updatedUser };
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false, errorMessage: 'Failed to update profile' };
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, errorMessage: 'Failed to update profile' };
      }
    },



    getUserDetails: async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await axios.get(`${baseUrl}/auth/getUserDetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          const userDetails = response.data;
          set({ user: userDetails });
          return { success: true, user: userDetails };
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false, errorMessage: 'Failed to fetch user details' };
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        return { success: false, errorMessage: 'Failed to fetch user details' };
      }
    },


    // admin side

    getTotalRegisteredUsersPerMonth: async () => {
      try {

        
        const response = await axios.get(`${baseUrl}/auth/getUsersperMonth`)
          
        if (response.data && response.data.success) {
          set({ totalUserPerMonth: response.data.data });
          // console.log('Total users per month data:', response.data.data);
        } else {
          console.error('Failed to fetch total registered users per month');
        }
      } catch (error) {
        console.error('Error fetching total registered users per month:', error);
      }
    },

    getTotalRegisteredUsers: async () => {
      try {

        const response = await axios.get(`${baseUrl}/auth/getTotalUsers`)
          
  
        if (response.data && response.data.success) {
          set({ totalRegisteredUsers: response.data.totalRegisteredUsers });
        } else {
          console.error('Failed to fetch total registered users');
        }
      } catch (error) {
        console.error('Error fetching total registered users:', error);
      }
    },

    getTotalActiveUsers: async () => {
      try {

        const response = await axios.get(`${baseUrl}/auth/getTotalActiveUsers`)
          
  
        if (response.data && response.data.success) {
          set({ totalActiveUsers: response.data.totalActiveUsers });
        } else {
          console.error('Failed to fetch total active users');
        }
      } catch (error) {
        console.error('Error fetching total active users:', error);
      }
    },

    getTotalNewUsers: async () => {
      try {

        const response = await axios.get(`${baseUrl}/auth/getTotalNewUsers`)
          
  
        if (response.data && response.data.success) {
          set({ totalNewUsers: response.data.totalNewUsers });
        } else {
          console.error('Failed to fetch total new users');
        }
      } catch (error) {
        console.error('Error fetching total new users:', error);
      }
    },


    getAllUsers: async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/getUsers`);
        if (response.status === 200) {
          const users = response.data;
          set({ allUsers: users });
     
          return { success: true, users: users };
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false, errorMessage: 'Failed to fetch users' };
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, errorMessage: 'Failed to fetch users' };
      }
    },

    removeUser: async (userId) => {
      try {
        const response = await axios.delete(`${baseUrl}/auth/removeUser/${userId}`);
        if (response.status === 200) {
          // Filter out the removed user from the local state
          set((state) => ({
            allUsers: state.allUsers.filter((user) => user.userId !== userId),
          }));
          toast.success('User removed successfully');
          return { success: true };
        } else {
          console.error('Unexpected response status:', response.status);
          return { success: false, errorMessage: 'Failed to remove user' };
        }
      } catch (error) {
        console.error('Error removing user:', error);
        return { success: false, errorMessage: 'Failed to remove user' };
      }
    },

    viewUser: async (userId) => {
      try {
        const response = await axios.get(`${baseUrl}/auth/viewUser/${userId}`);
        if (response.data.success) {
          const user = response.data.user;
          return { success: true, user };
        } else {
          console.error('User not found:', response.data.message);
          return { success: false, errorMessage: response.data.message };
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, errorMessage: 'Internal server error' };
      }
    },

    


  }));


   
    
    


  // useAuthStore.getState().initializeUserFromLocalStorage();

  export default useAuthStore;
