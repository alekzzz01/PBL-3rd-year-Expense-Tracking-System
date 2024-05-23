import React, { useState, useEffect } from 'react';
import BackupTable from '../admincomponents/tables/backupTable';
import { baseUrl } from '../store/url.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Backuprestore() {
    const [isActive, setIsActive] = useState(() => {
        // Retrieve the value of 'isActive' from local storage, defaulting to false if not present
        const storedValue = localStorage.getItem('isActive');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        // Save the current value of 'isActive' to local storage whenever it changes
        localStorage.setItem('isActive', JSON.stringify(isActive));
    }, [isActive]);

    const handleTriggerBackup = async () => {
        try {
            const response = await fetch(`${baseUrl}/trigger-daily-backup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setIsActive(true);
                toast.success('Daily backup triggered successfully');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to trigger daily backup');
            }
        } catch (error) {
            console.error('Error triggering daily backup:', error);
            toast.error('Failed to trigger daily backup');
        }
    };

    const handleCancelBackup = async () => {
        try {
            const response = await fetch(`${baseUrl}/cancel-daily-backup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setIsActive(false);
                toast.success('Scheduled daily backup canceled successfully');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to cancel scheduled daily backup');
            }
        } catch (error) {
            console.error('Error canceling scheduled daily backup:', error);
            toast.error('Failed to cancel scheduled daily backup');
        }
    };

    return (
        <div className='p-9 w-full'>
            <div className='border border-base-200 px-6 py-5 rounded-md flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='font-bold'>Daily Backup</p> 
                    <p className={`px-2 py-1 rounded-sm border border-base-200 text-sm ${isActive ? 'text-primary' : 'text-base'}`}>{isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <label className="cursor-pointer">
                    <input type="checkbox" className="toggle" checked={isActive} onChange={isActive ? handleCancelBackup : handleTriggerBackup} />
                </label>
            </div>
            <div>
                <BackupTable />
            </div>
        </div>
    );
}

export default Backuprestore;
