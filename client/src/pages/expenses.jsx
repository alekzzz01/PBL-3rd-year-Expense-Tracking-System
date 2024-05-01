import React from 'react'
import UserBarChart  from '../components/charts/userBarChart';

function expenses() {
  return (
    <div className=' p-9 w-full flex flex-col gap-6'>

              <div className='p-3 border rounded-xl bg-white' style={{ height: 500 }}>
                    <UserBarChart />
              </div>


              <div className='grid grid-cols-1 lg:grid-cols-3 gap-9'>


                          <div className='flex flex-col gap-6'> 
                                <p className='font-bold'>Necessities</p>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>



                          </div>

                          <div className='flex flex-col gap-6'> 
                                <p className='font-bold'>Savings</p>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>



                          </div>

                          <div className='flex flex-col gap-6'> 
                                <p className='font-bold'>Wants</p>

                                <div className='p-3 border rounded-xl'>
                                          <div className='flex flex-row items-center justify-between font-medium'>
                                              <p>Grocery</p>
                                              <p>04/26/2024</p>
                                          </div>
                                          <div className='flex flex-row items-center justify-between font-light'>
                                              <p>Budget: 10000</p>
                                              <p>Expense: 1000</p>
                                          </div>
                                </div>



                          </div>






              </div>


      
    </div>
  )
}

export default expenses
