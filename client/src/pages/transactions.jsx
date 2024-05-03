import React from 'react'
import TransactionTable from '../components/tables/transactionTable';

import UserBarChart from '../components/charts/userBarChart'


function transactions() {
  return (
      <div className=' p-9 w-full flex flex-col gap-5'>
            <div>
              <p className='text-xl font-bold'>TRANSACTIONS</p>
            </div>

       

   
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

              {/* Card UI */}

                <div className='py-5 px-6 border border-base-300 rounded-xl'>

                    
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

               
                <div className='col-span-1 lg:col-span-2 flex flex-col gap-5'>

                        <div className=' border border-base-300 rounded-xl py-5 px-6 '>
                            <p>Transactions</p>
                            <TransactionTable/>
                          </div>

                        <div className='col-span-1 lg:col-span-3 py-5 px-6 border border-base-300 rounded-xl'>
                            <p>Loans</p>
                            <TransactionTable/>
                        </div>

                         
                </div>

                
                

            </div>



    

      </div>
  )
}

export default transactions
