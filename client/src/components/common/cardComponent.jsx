import React from 'react'

function cardComponent() {

    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      
    const currentDate = new Date().toLocaleString('en-US', options);
  
  return (
    <>

            <p className='mb-6 text-lg font-medium'>My Cards</p>

                                        
            <div class="w-full h-56 rounded-xl relative text-white transition-transform transform hover:scale-105">

            <img class="relative object-cover w-full h-full rounded-xl"  alt="bg" src="https://i.imgur.com/kGkSg1v.png"/>

            <div class="w-full px-8 absolute top-8">
                <div class="flex justify-between">
                    <div class="">
                        <p class="font-light">
                            Name
                        </p>
                        <p class="font-medium tracking-widest">
                            Karthik P
                        </p>
                    </div>
                    <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" alt="mastercard" />
                </div>
                <div class="pt-1">
                    <p class="font-light">
                        Card Number
                        </p>
                    <p class="font-medium tracking-more-wider">
                        4642  3489  9867  7632
                    </p>
                </div>
                <div class="pt-6 pr-6">
                    <div class="flex justify-between">
                        <div class="">
                            <p class="font-light text-xs">
                                Valid
                                </p>
                            <p class="font-medium tracking-wider text-sm">
                                11/15
                            </p>
                        </div>
                        <div class="">
                            <p class="font-light text-xs">
                                Expiry
                                </p>
                            <p class="font-medium tracking-wider text-sm">
                                03/25
                            </p>
                        </div>

                        <div class="">
                            <p class="font-light text-xs">
                                CVV
                                </p>
                            <p class="font-bold tracking-more-wider text-sm">
                                ···
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            </div>

            <div className='flex flex-wrap gap-3 w-full mt-3'>


                <div className='grid grid-cols-2 gap-3 w-full'>
                    <button className='btn' onClick={()=>document.getElementById('money_In').showModal()}>Money In</button>
                    <button className='btn' onClick={()=>document.getElementById('money_Out').showModal()}>Money Out</button>
                </div>

                <button className='btn btn-neutral w-full mt-3' onClick={()=>document.getElementById('new_Card').showModal()}>Add New Card</button>
            </div>


            
      <dialog id="money_In" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Money</h3>

                
              
                    <form action="" className='flex flex-col gap-3' >


                      <select className='p-3 border rounded-xl w-full' name="paymentMethod" >
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>


                      <input className='p-3 border rounded-xl w-full' name='amount'  type="text" placeholder='Amount' /> 

                      <input className='p-3 border rounded-xl w-full' name='fullName' type="text" placeholder='Full Name' /> 



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                          <p className='font-normal'>{currentDate}</p>
                        
                      </div>


                      <button className='btn'>Save</button>
                    
                    


                    </form>


                </div>
      </dialog>

              
      <dialog id="money_Out" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Cashout</h3>

                
              
                    <form action="" className='flex flex-col gap-3' >


                      <select className='p-3 border rounded-xl w-full' name="paymentMethod" >
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>


                      <input className='p-3 border rounded-xl w-full' name='amount'  type="text" placeholder='Amount' /> 

                      <input className='p-3 border rounded-xl w-full' name='fullName' type="text" placeholder='Full Name' /> 



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                          <p className='font-normal'>{currentDate}</p>
                        
                      </div>


                      <button className='btn'>Save</button>
                    
                    


                    </form>


                </div>
      </dialog>

      <dialog id="new_Card" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add New Card</h3>

                
              
                    <form action="" className='flex flex-col gap-3' >


                      <select className='p-3 border rounded-xl w-full' name="paymentMethod" >
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>


                      <input className='p-3 border rounded-xl w-full' name='amount'  type="text" placeholder='Amount' /> 

                      <input className='p-3 border rounded-xl w-full' name='fullName' type="text" placeholder='Full Name' /> 



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                          <p className='font-normal'>{currentDate}</p>
                        
                      </div>


                      <button className='btn'>Save</button>
                    
                    


                    </form>


                </div>
      </dialog>
        
    </>
  )
}

export default cardComponent
