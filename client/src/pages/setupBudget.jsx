import React from 'react'
import PieChart from '../components/charts/userPieChart'
import CardComponent from '../components/common/cardComponent'




function setupBudget() {
  return (
    <div className=' p-9 w-full flex flex-col gap-6'>

    <div className='flex items-center justify-between'>
                  <p className='text-2xl font-bold'>Wallet Setup</p>
                  <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Budget</button>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

          <div className='py-5 px-6 border border-base-300 rounded-xl'>
                <CardComponent/>
          </div>

          <div className='py-5 px-6 border border-base-300 rounded-xl'>
                <p className='mb-6 text-lg'>Main Balance</p>
                <p className='text-5xl font-medium tracking-wide'>$32,000.00</p>

          </div>



          <div className='border rounded-xl  py-5 px-6 w-full'>
              <PieChart/>
          </div>

      </div>


      <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Budget</h3>

                
              
                    <form action="" className='flex flex-col gap-3' >


                      <input className='p-3 border rounded-xl w-full' name='amount'  type="text" placeholder='Amount' /> 
                      <button className='btn'>Save</button>
                    
                
                    </form>


                </div>
      </dialog>

    
</div>
  )
}

export default setupBudget
