import React from 'react'
import TransactionTable from '../components/tables/transactionTable';



function transactions() {
  return (
      <div className='p-9 w-full flex flex-col gap-5'>


            <div className='flex flex-col gap-5'> 

                        <div className=' border border-base-300 rounded-xl py-5 px-6'>
                            <TransactionTable/>
                        </div>

                         
            </div>

            

      </div>
  )
}

export default transactions
