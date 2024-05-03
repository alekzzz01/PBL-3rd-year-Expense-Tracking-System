import React from 'react'
import TransactionTable from '../components/tables/transactionTable';
import UserPieChart from '../components/charts/userPieChart';


function transactions() {
  return (
      <div className=' p-9 w-full flex flex-col gap-5'>
            <div>
              <p className='text-xl font-bold'>TRANSACTIONS</p>
            </div>

       

   
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

                <div className='py-5 px-6 border border-base-300 rounded-xl'>

                      {/* Card UI */}
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
                                <button className='btn'>Money In</button>
                                <button className='btn'>Money Out</button>
                            </div>

                            <button className='btn btn-neutral w-full mt-3'>Add New Card</button>
                      </div>


                </div>

    
                <div className='py-5 px-6 border border-base-300 rounded-xl flex flex-col col-span-1 lg:col-span-2'>

                    <p className='font-bold'>Activities</p>

                    <div className='flex flex-wrap gap-10 mt-8'>   

                            <div>
                                <p className='font-medium'>Income Activity</p>
                            
                                <div className='flex items-center gap-3 mt-3'>
                                    <p className='text-4xl'>$5,200.10</p>
                                    <p className='px-2 py-1 bg-green-100 text-green-600 border border-green-300  rounded-xl'>+12%</p>
                                </div>
                            </div>

                            <div>
                                <p className='font-medium'>Expense Activity</p>
                            
                                <div className='flex items-center gap-3 mt-3'>
                                    <p className='text-4xl'>$5,200.10</p>
                                    <p className='px-2 py-1 bg-green-100 text-green-600 border border-green-300  rounded-xl'>+12%</p>
                                </div>
                            </div>

                            <div>
                                <p className='font-medium'>Goal Activity</p>
                            
                                <div className='flex items-center gap-3 mt-3'>
                                    <p className='text-4xl'>$5,200.10</p>
                                    <p className='px-2 py-1 bg-red-100 text-red-600 border border-red-300 rounded-xl'>+12%</p>
                                </div>
                            </div>


                    </div>

                    <div className='mt-10'>
                            <UserPieChart/>
                    </div>

                </div>

                {/* <div className='col-span-1 lg:col-span-3'>
                        <UserPieChart/>
                </div>
             */}
                <div className='col-span-1 lg:col-span-3 p-3 border border-base-300 rounded-xl bg-white'>
                          <TransactionTable/>
                </div>

                
                <div className='col-span-1 lg:col-span-3 py-5 px-6 border border-base-300 rounded-xl'>
                <p>Loans</p>
                </div>

            </div>



    

      </div>
  )
}

export default transactions
