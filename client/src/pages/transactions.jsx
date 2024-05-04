import React from 'react'
import TransactionTable from '../components/tables/transactionTable';



function transactions() {
  return (
      <div className='p-9 w-full flex flex-col gap-5'>


            <div className='flex flex-col gap-5'>

                        <div className=' border border-base-300 rounded-xl py-5 px-6'>
                            <p className='mb-6 text-lg font-medium'>Transactions List</p>
                            <TransactionTable/>
                          </div>

                        <div className='col-span-1 lg:col-span-3 py-5 px-6 border border-base-300 rounded-xl'>
                            <p className='mb-6 text-lg font-medium'>Loans</p>
                            <TransactionTable/>
                        </div>

                         
            </div>

            

      </div>
  )
}

export default transactions
