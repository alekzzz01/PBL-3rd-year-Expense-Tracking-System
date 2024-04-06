import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import SelectTheme from '../components/themeSelector';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const login = useAuthStore(state => state.login);
 
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    try {
      const message = await login(username, password);
      if (message) {
        // If there's a message returned from the login function, set it as the error message
        setErrorMessage(message);
      } else {
        // If login is successful, navigate to dashboard
        navigate('/dashboard');
        
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Set a generic error message
      setErrorMessage('Failed to login. Please check your credentials.');
    }
  };
  
  
  useEffect(() => {
    // Retrieve registration message from localStorage
    const message = localStorage.getItem('registrationMessage');
    if (message) {
      setRegistrationMessage(message);
      // Clear registration message from localStorage after displaying it
      localStorage.removeItem('registrationMessage');
    }
  }, []);

  return (
    <>
      <section className="">
        <SelectTheme />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Login</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
                  <input type="text" name="username" id="username" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Username" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                </div>
                <button type="submit" className="w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                <p className="text-sm font-light">Don't have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link></p>
              </form>
            </div>
          </div>

          {registrationMessage &&
            <div className='mt-3 rounded-md bg-green-100 border border-green-400 p-4 mb-4'>
              <p className='text-sm text-green-700'></p>
              {registrationMessage}
            </div>}

          {errorMessage &&
            <div className='mt-3 rounded-md bg-red-100 border border-red-400 p-4 mb-4'>
              <p className='text-sm text-red-700'></p>
              {errorMessage}
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default Login;
