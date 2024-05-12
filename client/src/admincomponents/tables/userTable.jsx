  import React, { useEffect, useState } from 'react';
  import { Eye, Trash } from 'lucide-react';
  import DataTable from 'react-data-table-component';
  import useAuthStore from '../../store/authStore'; // Update the path accordingly

  function UserTable() {

    const { allUsers, getAllUsers, isLoading, isError, errorMessage } = useAuthStore(); // Access state and actions from the store
    const { removeUser,  viewUser } = useAuthStore();
    const [selectedRows, setSelectedRows] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);


    useEffect(() => {
      getAllUsers(); // Fetch transactions when component mounts
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to ensure it only runs once


    const handleViewUser = async (userId) => {
      try {
        const { success, user, errorMessage } = await viewUser(userId);
        if (success) {
          // Populate modal with user details
          document.getElementById('user_name').textContent = `${user.firstName} ${user.lastName}`;
          document.getElementById('user_email').textContent = user.email;
          document.getElementById('user_username').value = user.username;
      
          const createdAtDate = new Date(user.createdAt);
          const formattedCreatedAt = createdAtDate.toLocaleString(); // Adjust locale and options as needed
          document.getElementById('user_createdAt').value = formattedCreatedAt;

          const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null;
          const formattedLastLogin = lastLoginDate ? lastLoginDate.toLocaleString() : 'Never logged in';
          document.getElementById('user_lastLogin').value = formattedLastLogin;

          document.getElementById('user_status').value = user.status;
          document.getElementById('user_bio').value = user.bio;
          document.getElementById('view_user').showModal();
        } else {
          console.error('Error viewing user:', errorMessage);
          // Handle error, such as displaying a notification
        }
      } catch (error) {
        console.error('Error viewing user:', error);
        // Handle error, such as displaying a notification
      }
    };
    
    
    
    const handleDeleteUser = (userId, event) => {
      event.stopPropagation(); // Prevent the event from bubbling up
      setUserToDelete(userId); // Set the user to delete
      document.getElementById('delete_user').showModal(); // Show the delete confirmation modal
    };
  
    const handleConfirmDelete = () => {
      if (userToDelete) {
        removeUser(userToDelete)
          .then(() => {
            getAllUsers(); 
            setSelectedRows([]);
            setUserToDelete(null); // Reset userToDelete state
            console.log('User deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      }
    };


    const handleDeleteSelected = async () => {
      try {
        for (const row of selectedRows) {
          await removeUser(row._id);
        }
        getAllUsers();
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

      {
        name: 'Actions',
    
        cell: (row) => (
          <div>

            <button className='btn btn-ghost btn-circle' onClick={() => handleViewUser(row._id)}>
              <Eye size={16} color="#007bff" />
            </button>

            
            <button className='btn btn-ghost btn-circle' onClick={() => document.getElementById('delete_user').showModal()}>
              <Trash
                size={16}
                color="#dc3545"
                onClick={(event) => handleDeleteUser(row._id, event)} // Pass userId and event
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

        <p className='mb-6 text-lg font-medium'>Users List</p>

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
            data={allUsers}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            fixedHeader
            pagination
            theme="solarized"
          />
        </>
      )}


      
      <dialog id="view_user" className="modal">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('view_user').close()}>✕</button>
          <div>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <p className="text-2xl font-bold" id="user_name"></p>
              <p className="font-medium tracking-wide text-gray-500" id="user_email"></p>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-3">
              <p className="font-medium">Username</p>
              <input className="input input-bordered w-full col-span-2" id="user_username" type="text" placeholder="Username" readOnly />
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-3">
              <p className="font-medium">Status</p>
              <input className="input input-bordered w-full col-span-2" id="user_status" type="text" readOnly />
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-3">
              <p className="font-medium">Created at</p>
              <input className="input input-bordered w-full col-span-2" id="user_createdAt" type="text"  readOnly />
            </div>

            
      
            <div className="divider"></div>

            <div className="grid grid-cols-3">
              <p className="font-medium">Last login</p>
              <input className="input input-bordered w-full col-span-2" id="user_lastLogin" type="text" readOnly />
            </div>


            <div className="divider"></div>

            <div className="grid grid-cols-3">
              <p className="font-medium">Bio</p>
              <textarea className="textarea textarea-bordered h-24 col-span-2" id="user_bio" placeholder="Bio" readOnly></textarea>
            </div>

            <div className="divider"></div>

          </div>
        </div>
      </dialog>

      <dialog id="delete_user" className="modal">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setUserToDelete(null)}>✕</button>
          <p className="py-4">Are you sure you want to delete this user?</p>
          <div className="modal-action">
            <form method="dialog">
              <div className='w-full flex justify-end items-center gap-4'>
                <button className="btn" onClick={() => setUserToDelete(null)}>Close</button>
                <button className='btn bg-red-200 text-red-700' onClick={handleConfirmDelete}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>



    
    </>
    );
  }

  export default UserTable;
