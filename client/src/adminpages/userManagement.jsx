import React from 'react'
import UserTable from '../admincomponents/tables/userTable'


function UserManagement() {
  return (
    <div className='p-9 w-full'>


        <div className=' border border-base-300 rounded-xl py-5 px-6'>
                <UserTable/>
        </div>

   
    </div>
  )
}

export default UserManagement
