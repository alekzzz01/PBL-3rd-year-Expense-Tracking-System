import React, { useState, useEffect } from 'react';
import { Download, Trash } from 'lucide-react';
import DataTable from 'react-data-table-component';
import { baseUrl } from '../../store/url.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BackupTable() {
    const handleBackup = async () => {
        try {
            const response = await fetch(`${baseUrl}/backup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data && data.skipped) {
                    console.log(data.message);
                    toast.success(data.message);
                } else {
                    console.log(data.message);
                    toast.info(data.message);
                }
            } else {
                console.error(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error occurred while making backup request:', error);
        }
    };

    const handleDownload = async (backupId, folderName) => {
        try {
            const response = await fetch(`${baseUrl}/download-backup/${backupId}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${folderName}.zip`; // Set the filename dynamically based on the folderName
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to download backup');
            }
        } catch (error) {
            console.error('Error downloading backup:', error);
            toast.error('Failed to download backup');
        }
    };
    

    const [backups, setBackups] = useState([]);

    useEffect(() => {
        fetchBackups();
    }, []);

    const fetchBackups = async () => {
        try {
            const response = await fetch(`${baseUrl}/backups`);
            if (!response.ok) {
                throw new Error('Failed to fetch backups');
            }
            const data = await response.json();
            setBackups(data);
        } catch (error) {
            console.error('Error fetching backups:', error);
            toast.error('Failed to fetch backups');
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Folder Name',
            selector: row => row.folderName,
            sortable: true,
        },
        {
            name: 'Size (Bytes)',
            selector: row => row.size,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                   <button className='btn btn-ghost btn-circle' onClick={() => handleDownload(row._id, row.folderName)}>
                        <Download size={16} color="#007bff" />
                    </button>
                    <button className='btn btn-ghost btn-circle' onClick={() => document.getElementById('delete_user').showModal()}>
                        <Trash size={16} color="#dc3545" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <>
            <div className='py-5 flex justify-end gap-4 mt-8'>
                <button className='btn btn-outline-' onClick={() => console.log('Restore functionality not implemented yet')}>Restore</button>
                <button className='btn btn-primary' onClick={handleBackup}>Backup</button>
            </div>

            <DataTable
                columns={columns}
                data={backups}
                selectableRows
                pagination
                theme="solarized"
            />
        </>
    );
}

export default BackupTable;
