import React, { useEffect, useState } from 'react';
import { Eye, Trash } from 'lucide-react';
import DataTable from 'react-data-table-component';
import useEventStore from '../../store/eventStore'; 


function EventLogs() {

    const { allLogs, getAllEventLogs, isLoading, isError, errorMessage } = useEventStore(); 
    const [selectedRows, setSelectedRows] = useState([]);


    useEffect(() => {
      getAllEventLogs(); // Fetch transactions when component mounts
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to ensure it only runs once


    // const handleDeleteSelected = async () => {
    //     try {
    //       for (const row of selectedRows) {
    //         await removeUser(row._id);
    //       }
    //       getAllUsers();
    //       setSelectedRows([]);
    //       console.log('Rows deleted successfully');
    //     } catch (error) {
    //       console.error('Error deleting rows:', error);
    //     }
    //   };
      


    // const handleRowSelected = rows => {
    //     setSelectedRows(rows.selectedRows);
    //   };
  

    const columns = [
      {
        name: 'ID',
        selector: row => row._id,
        sortable: true,
      },
      {
        name: 'User ID',
        selector: row => row.userId,
        sortable: true,
      },
      {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
      },
      {
        name: 'Event Type',
        selector: row => row.eventType,
        sortable: true,
      },
      {
        name: 'Event Details',
        selector: row => row.eventDetails,
        sortable: true,
      },
      {
        name: 'IP Address',
        selector: row => row.ipAddress,
        sortable: true,
      },
      {
        name: 'Timestamp',
        selector: row => row.timestamp,
        sortable: true,
      },
      {
        name: 'Actions',
        cell: (row) => (
          <div>
            <button className='btn btn-ghost btn-circle'>
              <Eye size={16} color="#007bff" />
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

            <div className='flex items-center justify-between'>

            <p className='mb-6 text-lg font-medium'>Event Logs</p>

            {/* {selectedRows.length > 0 && (
                <button className='border border-base-300 btn' onClick={handleDeleteSelected}> <Trash
                size={16}
                color="#dc3545"  /></button>
                )} */}
            </div>




            {isLoading ? (
            <div>Loading...</div>
            ) : isError ? (
            <div>Error: {errorMessage}</div>
            ) : (
            <>
            
            <DataTable
                columns={columns}
                data={allLogs}
                selectableRows
                // onSelectedRowsChange={handleRowSelected}
            
                pagination
                theme="solarized"
            />
            </>
            )}






   </>
  )
}

export default EventLogs
