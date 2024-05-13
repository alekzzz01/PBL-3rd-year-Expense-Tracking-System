import React from 'react'
import { Analytics } from "@vercel/analytics/react"

function vercelManagement() {
  return (
    <div className='p-9 w-full'>

        <div className=' border border-base-300 rounded-xl py-5 px-6'>
                <Analytics/>
        </div>

      
    </div>
  )
}

export default vercelManagement
