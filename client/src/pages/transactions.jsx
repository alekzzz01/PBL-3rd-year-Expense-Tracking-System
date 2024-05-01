import React from 'react'
import TransactionTable from '../components/tables/transactionTable';

function transactions() {
  return (
      <div className=' p-9 w-full flex flex-col gap-6'>
            <div>
              <p className='text-xl font-bold'>TRANSACTIONS</p>
            </div>
            <div className='p-3 border rounded-xl bg-white'>
                      <TransactionTable/>
            </div>
      </div>
  )
}

export default transactions
