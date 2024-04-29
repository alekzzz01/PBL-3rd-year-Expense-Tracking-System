import React from 'react';
import UserBarChart  from '../components/charts/userBarChart';
import TransactionTable from '../components/tables/transactionTable';


function dashboard() {
  return (
    <>

    <div className='p-5 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 '>

                <div className='flex flex-col gap-5 col-span-1 md:col-span-1 lg:col-span-2'>
                    <div className='p-3 border rounded-xl bg-white' style={{ height: 500 }}>
                          <UserBarChart />
                        
                    </div>

                    <div className='p-3 border rounded-xl bg-white'>
                      <TransactionTable/>
                    </div>

                </div>
                

              <div className='flex flex-col gap-5'>
                <div className='py-5 px-6 flex flex-col gap-5 border rounded-xl w-full'>  

                      <div className='p-4 rounded-lg flex flex-col gap-6 ' style={{ backgroundColor:"#D8E2FD", color: "#35354E"}}>
                              <p className='text-sm font-normal'>Total Income</p>
                              <p className='text-2xl font-semibold'>$16,000.00</p>
                      </div>

                      <div className='p-4 rounded-lg flex flex-col gap-6' style={{ backgroundColor:"#F9E1E1", color: "#4E3535"}}>
                              <p className='text-sm font-normal'>Total Expenses</p>
                              <p className='text-2xl font-semibold'>$16,000.00</p>
                      </div>

                      <div className='p-4 rounded-lg flex flex-col gap-6' style={{ backgroundColor:"#D8EAEA", color: "#3D4E35"}}>
                              <p className='text-sm font-normal'>Total Save</p>
                              <p className='text-2xl font-semibold'>$16,000.00</p>
                      </div>
                       

                      <div className='p-4 rounded-lg flex flex-col gap-6' style={{ backgroundColor:"#D8DCEA", color: "#35364E"}}>
                              <p className='text-sm font-normal'>Transactions</p>
                              <p className='text-2xl font-semibold'>$16,000.00</p>
                      </div>
                       
         
                </div>

                <div className='py-5 px-6 flex flex-col gap-5 border rounded-xl w-full'> 
                    <div className='p-4 rounded-lg flex flex-col border gap-2 '>
                            <span className="badge">New</span>
                              <p className='font-medium'>Savings 101 - BGC - 05, Sept. 2022</p>
                              <p className='text-sm font-light'>Description of 101</p>
                    </div>

                    <div className='p-4 rounded-lg flex flex-col border gap-2 '>
                            <span className="badge">New</span>
                              <p className='font-medium'>Savings 101 - BGC - 05, Sept. 2022</p>
                              <p className='text-sm font-light'>Description of 101</p>
                    </div>

                   
                </div>

              </div>


              


            </div>
           
    </div>

    </>
  )
}

export default dashboard
