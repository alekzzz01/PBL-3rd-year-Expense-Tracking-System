import React from 'react'

function Savings() {

    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };

    const currentDate = new Date().toLocaleString('en-US', options);

  return (

    <>

        <div className='p-6 w-full flex flex-col gap-6'>

            <div className='flex items-center justify-between'>
                  <p className='text-xl font-bold'>Savings</p>
                  <button className='btn' onClick={()=>document.getElementById('addSavings').showModal()}>Add Savings</button>
            </div>

            <div role="tablist" className="tabs tabs-bordered w-full 2xl:w-1/4">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="All" checked />
            
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Achieved"  />

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="In Progress" />

            </div>

           
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5'>

                        <div className='border border-base-200 rounded-md shadow-md'>

                            <div className='pt-5 px-6'>
                                <p className='text-2xl font-bold'>Bike Savings</p>
                            </div>

                            <div className='grid grid-cols-2 gap-5 py-5 px-6'>

                                <div>
                                    <p className='text-sm font-normal'>Current Save</p>
                                    <p className='text-xl font-semibold'>$ 6,900.00</p>
                                </div>

                                <div>
                                    <p className='text-sm font-normal'>Saving Goal</p>
                                    <p className='text-xl font-semibold'>$ 10,000.00</p>
                                </div>

                            </div>


                            <div className='px-6'>
                                <progress className="progress progress-primary w-full" value="6900" max="10000"></progress>
                            </div>

                            
                            <div className='grid grid-cols-2 gap-5 py-5 px-6'>

                                <div>
                                    <p className='text-sm font-normal'>Finish By</p>
                                    <p className='text-xl font-semibold'>May 16,2024</p>
                                </div>

                                <div>
                                    <p className='text-sm font-normal'>Frequency</p>
                                    <p className='text-xl font-semibold'>Monthly</p>
                                </div>

                            </div>

                            <div className='divider'></div>

                            <div className='w-full text-center pb-5'>
                                <button className='btn font-bold'>Add Amount</button>
                            </div>


                        </div>
                        
                       

            </div>





            
            <dialog id="addSavings" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Savings</h3>

                
              
                    <form action="" className='flex flex-col gap-3' >


                    
                      <input className='input input-bordered w-full' name='name'  type="text" placeholder='Name' /> 

                      <input className='input input-bordered w-full' name='goalAmount'  type="text" placeholder='Amount' /> 


                      <select className='select select-bordered w-full' name="expenseType" >
                        <option selected >Frequency</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                          <p className='font-normal'>{currentDate}</p>
                      </div>


                      <button className='btn'>Save</button>
                    
                    


                    </form>


                </div>
            </dialog>

      
        </div>


    </>
   
  )
}

export default Savings
