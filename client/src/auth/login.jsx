import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';


function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = useAuthStore(state => state.login);
 


  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    try {
      const message = await login(email, password);
      if (message) {
        // If there's a message returned from the login function, set it as the error message
        setErrorMessage(message);
      } else {
        // Clear error message if there's no specific error from the login function
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Set a generic error message
      setErrorMessage('Failed to login. Please check your credentials.');
    }
  };
  
  
  
  return (
    <>
      <section className="">
    
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Login</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input type="email" name="email" id="email" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Email Address" required />
                </div>




                <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password" id="password" placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute top-0 end-0 p-3.5 rounded-e-md"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {showPassword ? (
                              <>
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                <line x1="2" x2="22" y1="2" y2="22"></line>
                              </>
                            ) : (
                              <>
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </>
                            )}
                          </svg>
                        </button>
                      </div>
                </div>

                <div className="text-sm w-full text-end">
                  
                    <Link to="/forgotpassword" className="mr-3 font-medium text-primary hover:underline">Forgot Password ?</Link>
                  </div>



                <button type="submit" className="w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                <p className="text-sm font-light">Don't have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link></p>
              </form>
            </div>
          </div>

       

          {errorMessage &&
            <div className='rounded-md bg-red-100 border border-red-400 p-4'>
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
