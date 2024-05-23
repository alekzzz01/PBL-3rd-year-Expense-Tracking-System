import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import useAuthStore from '../store/authStore';// Import your useAuthStore

function Verifyotp() {

    const [loading, setLoading] = useState(false);

    const verifyOTP = useAuthStore(state => state.verifyOTP); // Access the verifyOTP function from useAuthStore

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = e.target.elements.otp.value;
        console.log('OTP:', otp); // Log the OTP value
        setLoading(true);
       
        try {
            await verifyOTP(otp);
            
        } catch (error) {   
           
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <section className="">
                <div className="flex items-center justify-center px-6 py-8 h-screen">
                    <div className="w-full rounded-lg sm:max-w-md">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div>
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl mb-2  ">OTP Verification</h1>
                                <p className="text-sm font-medium ">Enter the verification sent in your email.</p>
                            </div>

                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <input type="otp" name="otp" id="otp" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Code" required />
                                </div>
                                <button type="submit" className="w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Verify Code</button>
                                <p className="text-sm font-light">Did'nt receive a code? <button to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Resend OTP</button></p>
                  
                                <div> {loading && (
                                    <div className="py-4 px-2 flex justify-center items-center">
                                        <TailSpin type="TailSpin" color="#000" height={30} width={30} />
                                    </div>
                                )}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Verifyotp;
