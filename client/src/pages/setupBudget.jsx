import React from 'react'
import PieChart from '../components/charts/userPieChart'




function setupBudget() {
  return (
    <div className=' p-9 w-full flex flex-col gap-6'>

    <div>
      <p className='text-xl font-bold'>BUDGET SETUP</p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
 
    <form className='border rounded-xl  py-5 px-6 col-span-1 lg:col-span-2'>

        <p className='mb-3'>Schedule</p>

        <div className='grid grid-cols-2 gap-3 mb-3'>
  
          <select className='p-3 border rounded-xl w-full' name="expenseType">
                        <option selected>Type</option>
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
          </select>

       
          <input className='p-3 border rounded-xl' name='totalbudget' type="text" placeholder='Input your total budget' />
      
        </div>

        <div className='w-full mt-6 flex justify-end'>
            <button className='btn btn-neutral btn-wide' >Save</button>
        </div>           

    </form>


    <div className='border rounded-xl  py-5 px-6'>
      <p>
        Budget
      </p>


   
     
        <div>
        <PieChart/>
        </div>


    </div>


    </div>
    
</div>
  )
}

export default setupBudget
