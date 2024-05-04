import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"

function Forgotpassword() {


    const [errorMessage] = useState('');
    const [successMessage] = useState('');


    const [showPassword, setShowPassword] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false); // State to track password validity
    const [passwordFocused, setPasswordFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (isValid) => {
        setPasswordValid(isValid);
    };


    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    };

    
    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    };


    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
      };

    
    

  
  return (
    <>
    <section className="">
    
      <div className="flex items-center justify-center px-6 py-8 h-screen">
        <div className="w-full rounded-lg sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Forgot Password</h1>
            <form className="space-y-4 md:space-y-6" action="#" >

           
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Email" required />
              </div>
          

             

            {/* Conditionally render the PasswordChecklist only when password input is focused */}
            {passwordFocused && (
                <div className='mt-3'>
                  <PasswordChecklist
                    rules={["minLength","specialChar","number","capital","match"]}
                    minLength={8}
                    value={formData.password}
                    valueAgain={formData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              )}

    
            
              <button type="submit" className="w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Forgot Password</button>
              
              <p className="text-sm font-light">
                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Return to login</Link>
              </p>

              
              <div>{errorMessage && <p className="text-sm text-red-700 text-center rounded-md bg-red-100 border border-red-400 p-4">{errorMessage}</p>}</div>
              <div>{successMessage && <p className="text-sm text-green-700 text-center rounded-md bg-green-100 border border-green-400 p-4">{successMessage}</p>}</div>

            </form>
          </div>
        </div>

      
      </div>
    </section>
  </>
  )
}

export default Forgotpassword
