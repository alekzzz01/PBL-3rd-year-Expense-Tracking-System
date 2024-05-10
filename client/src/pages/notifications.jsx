import React from 'react'

function notifications() {
  return (


    <div className='p-9  w-full'>

        <p className='text-xl font-bold'>Notifications</p>

        <div className="divider"></div>

        <div className='flex flex-col gap-4'>

          <label className="cursor-pointer label">
            <span className="label-text">Remember me</span> 
            <input type="checkbox" className="toggle toggle-primary" checked />
          </label>

          <label className="cursor-pointer label">
            <span className="label-text">Remember me</span> 
            <input type="checkbox" className="toggle toggle-primary" checked />
          </label>

          <label className="cursor-pointer label">
            <span className="label-text">Remember me</span> 
            <input type="checkbox" className="toggle toggle-primary" checked />
          </label>

        </div>
     
    </div>
  )
}

export default notifications
