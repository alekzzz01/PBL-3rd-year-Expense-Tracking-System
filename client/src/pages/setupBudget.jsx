import React from 'react'
import PieChart from '../components/charts/userPieChart'




function setupBudget() {
  return (
    <div className=' p-9 w-full flex flex-col gap-6'>

    <div className='flex items-center justify-between'>
                  <p className='text-xl font-bold'>BUDGET SETUP</p>
                  <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Budget</button>
      </div>


  
 
  


    <div className='border rounded-xl  py-5 px-6 w-full'>
      
        <div>
        <PieChart/>
        </div>


    </div>




    
    <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Expense</h3>

                
              
                    <form action="" className='flex flex-col gap-3' >


                      <select className='p-3 border rounded-xl w-full' name="expenseType" >
                        <option selected>Type</option>
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
                      </select>

                      <select className='p-3 border rounded-xl w-full' name="paymentMethod" >
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>

                      <input className='p-3 border rounded-xl w-full' name='category' type="text" placeholder='Category (e.g. Food, Transportation, Bills)' /> 

                      <input className='p-3 border rounded-xl w-full' name='amount'  type="text" placeholder='Amount' /> 

                      <input className='p-3 border rounded-xl w-full' name='fullName' type="text" placeholder='Full Name' /> 



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                        
                      </div>


                      <button className='btn'>Save</button>
                    
                    


                    </form>


                </div>
              </dialog>

    
</div>
  )
}

export default setupBudget
