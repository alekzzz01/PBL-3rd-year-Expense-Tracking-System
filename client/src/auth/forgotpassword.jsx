import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Import your Zustand store
import { TailSpin } from 'react-loader-spinner';

function Forgotpassword() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { success, errorMessage } = await useAuthStore.getState().forgotPassword(formData.email);
            if (success) {
                setSuccessMessage('Password reset email sent successfully. Check your inbox.');
                setErrorMessage('');
            } else {
                setErrorMessage(errorMessage || 'Failed to send reset password email');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Network error. Please try again.');
            setSuccessMessage('');
        } finally {
            setLoading(false); // Clear loading state regardless of success or failure
        }
    };

    return (
        <>
            <section className="">
                <div className="flex items-center justify-center px-6 py-8 h-screen">
                    <div className="w-full rounded-lg sm:max-w-md">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Forgot Password</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Email" required />
                                </div>
                                <button type="submit" className="w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Forgot Password</button>
                                <p className="text-sm font-light">
                                    <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Return to login</Link>
                                </p>
                                <div>{errorMessage && <p className="text-sm text-red-700 text-center rounded-md bg-red-100 border border-red-400 p-4">{errorMessage}</p>}</div>
                                <div>{successMessage && <p className="text-sm text-green-700 text-center rounded-md bg-green-100 border border-green-400 p-4">{successMessage}</p>}</div>
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
    );
}

export default Forgotpassword;
