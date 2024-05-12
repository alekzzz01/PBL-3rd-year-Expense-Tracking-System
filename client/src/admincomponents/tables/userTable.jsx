import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import useAuthStore from '../../store/authStore'; // Update the path accordingly

function UserTable() {

  const { allUsers, getAllUsers, isLoading, isError, errorMessage } = useAuthStore(); // Access state and actions from the store
  
  useEffect(() => {
    getAllUsers(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs once
 
  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <div className={row.status === 'Active' ? 'text-green-500 px-2 py-1 rounded-xl bg-green-100' : 'text-red-500  px-2 py-1 rounded-xl bg-red-100'}>
          {row.status}
        </div>
      ),
    },
  ];
  
  

  return (
    <>

    <div className='flex items-center justify-between'>

       <p className='mb-6 text-lg font-medium'>Users List</p>

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
           data={allUsers}
           selectableRows
          //  onSelectedRowsChange={handleRowSelected}
           fixedHeader
           pagination
           theme="solarized"
         />
       </>
     )}


   
   </>
  );
}

export default UserTable;
