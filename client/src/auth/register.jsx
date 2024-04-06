import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import SelectTheme from '../components/themeSelector';
import {useNavigate} from 'react-router-dom'; 

function Register() {
  const register = useAuthStore((state) => state.register);
  const [errorMessage, seterrorMessage] = useState('');
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
        seterrorMessage('Passwords dont match.');
      return;
    }
    seterrorMessage('');
    try {
      await register(username, email, password);
        localStorage.setItem('registrationMessage', 'User registered successfully. Please sign in.');
        navigate('/login');
   
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      seterrorMessage(error.message); // Assuming the error message is available in the error object
    }
  };

  return (
    <>
      <section className="">
        <SelectTheme />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Create an account</h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
                  <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Username" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Email" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                  <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">Confirm password</label>
                  <input type="password" name="confirmPassword" id="confirm-password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                </div>
                <div>{errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}</div>
          
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 checkbox" defaultChecked required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light">I accept the <a className="font-medium text-primary hover:underline" href="#/">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                <p className="text-sm font-light">
                  Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
