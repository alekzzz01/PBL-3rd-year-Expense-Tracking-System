import React from 'react'

import { PieChart, Pie } from 'recharts';


const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];

const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];

function setupBudget() {
  return (
    <div className=' p-9 w-full flex flex-col gap-6'>

    <div>
      <p className='text-xl font-bold'>BUDGET SETUP</p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
 
    <form className='border rounded-xl  py-5 px-6 col-span-1 lg:col-span-2'>

        <p className='mb-3'>Schedule</p>


        <div className='grid grid-cols-3 gap-3 mb-3'>
    
          <div className='flex items-center gap-2 p-3 border rounded-xl'>
                  <input name='Weekly' type="radio" value="weekly" />
                  <label htmlFor="Weekly">Weekly</label>
          </div>

          <div className='flex items-center gap-2 p-3 border rounded-xl'>
                  <input name='mid' type="radio" value="mid" />
                  <label htmlFor="mid">Mid-month</label>
          </div>

          <div className='flex items-center gap-2 p-3 border rounded-xl'>
                  <input name='Monthly' type="radio" value="monthly" />
                  <label htmlFor="Monthly">Monthly</label>
          </div>

       
          <input className=' p-3 border rounded-xl' name='totalbudget' type="text" placeholder='Input your total budget' />
      
  

        </div>

      


        <div className='w-full mt-6 flex justify-end'>
          <button className='bg-primary rounded-xl px-10 py-2 text-white'>Save</button>
        </div>           

    </form>


    <div className='border rounded-xl  py-5 px-6'>
      <p>
        Budget
      </p>


      <div className=''>
     
        <PieChart width={300} height={250}>
          <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
          <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>

      </div>
    </div>


    </div>
    
</div>
  )
}

export default setupBudget
