import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useIdleTimer } from 'react-idle-timer';
import Modal from '../common/sessionModal'; // Import your Modal component
import useAuthStore from '../../store/authStore'; // Import your Zustand store

const SessionTimeout = () => {
    const [showModal, setShowModal] = useState(false);
   
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { logout } = useAuthStore(); // Get logout function from useAuthStore // Assuming you have a logout function in your Zustand store

    const handleOnIdle = () => {
        setShowModal(true);
    };

    const handleStayLoggedIn = () => {
        setShowModal(false);
        resetIdleTimer(); // Reset the idle timer
    };

    
    const handleLogout = async () => {
        setShowModal(false);
        await logout(navigate); // Call logout function and pass navigate
    };

    const { reset: resetIdleTimer } = useIdleTimer({
        timeout: 30 * 60 * 1000, // 30 minutes in milliseconds
        onIdle: handleOnIdle,
    });

    return (
        <>
            {showModal && (
                <Modal onClose={handleStayLoggedIn}>
                    <p className="text-gray-700">Your session will expire soon. Do you want to stay logged in?</p>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleStayLoggedIn} className="mr-2 btn btn-info text-white px-4 py-2 rounded focus:outline-none">Stay Logged In</button>
                        <button onClick={handleLogout} className="btn btn-error text-white px-4 py-2 rounded 0 focus:outline-none">Logout</button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default SessionTimeout;
