import React from 'react'
import EventLogsTable from '../admincomponents/tables/eventLogs'

function eventLogsManagement() {
  return (
    <div className='p-9 w-full'>


    <div className='border border-base-200 rounded-xl py-5 px-6'>
            <EventLogsTable/>
    </div>


    </div>
  )
}

export default eventLogsManagement
