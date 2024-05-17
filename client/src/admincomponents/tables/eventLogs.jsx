import React, { useEffect, useState } from 'react';
import { Eye, Trash } from 'lucide-react';
import DataTable from 'react-data-table-component';
import useEventStore from '../../store/eventStore'; 


function EventLogs() {

    const { allLogs, getAllEventLogs, isLoading, isError, errorMessage } = useEventStore(); 
    const { removeEvent,  viewUser } = useEventStore();
    const [selectedRows, setSelectedRows] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
      getAllEventLogs(); // Fetch transactions when component mounts
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to ensure it only runs once

    const handleDeleteEvent = (eventId, event) => {
      event.stopPropagation(); // Prevent the event from bubbling up
      setEventToDelete(eventId); // Set the user to delete
      document.getElementById('delete_user').showModal(); // Show the delete confirmation modal
    };

    
    const handleConfirmDelete = () => {
      if (eventToDelete) {
        removeEvent(eventToDelete)
          .then(() => {
            getAllEventLogs(); 
            setSelectedRows([]);
            setEventToDelete(null); // Reset userToDelete state
            console.log('Event deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      }
    };


    const handleDeleteSelected = async () => {
      try {
        for (const row of selectedRows) {
          await removeEvent(row._id);
        }
        getAllEventLogs();
        setSelectedRows([]);
        console.log('Rows deleted successfully');
      } catch (error) {
        console.error('Error deleting rows:', error);
      }
    };
    

    const handleRowSelected = rows => {
      setSelectedRows(rows.selectedRows);
    };


  

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

          {/* <button className='btn btn-ghost btn-circle' onClick={() => handleViewUser(row._id)}>
            <Eye size={16} color="#007bff" />
          </button> */}

          
          <button className='btn btn-ghost btn-circle' onClick={() => document.getElementById('delete_user').showModal()}>
            <Trash
              size={16}
              color="#dc3545"
              onClick={(event) => handleDeleteEvent(row._id, event)} // Pass userId and event
            />
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

             {selectedRows.length > 0 && (
                <button className='border border-base-300 btn' onClick={handleDeleteSelected}> <Trash
                size={16}
                color="#dc3545"  /></button>
                )} 
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
                onSelectedRowsChange={handleRowSelected}
            
                pagination
                theme="solarized"
            />
            </>
            )}


      <dialog id="delete_user" className="modal">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setEventToDelete(null)}>✕</button>
          <p className="py-4">Are you sure you want to delete this user?</p>
          <div className="modal-action">
            <form method="dialog">
              <div className='w-full flex justify-end items-center gap-4'>
                <button className="btn" onClick={() => setEventToDelete(null)}>Close</button>
                <button className='btn bg-red-200 text-red-700' onClick={handleConfirmDelete}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>







   </>
  )
}

export default EventLogs
