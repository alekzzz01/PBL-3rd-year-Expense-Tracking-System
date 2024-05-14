import React, {useEffect} from 'react'
import TransactionTable from '../components/tables/transactionTable';
import CardComponent from '../components/common/cardComponent'
import useIncomeStore from '../store/incomeStore';
import useExpenseStore from '../store/expenseStore';



function Transactions() {


  const { totalIncome, getTotalIncome } = useIncomeStore();
  const { totalExpenses, getTotalExpenses } = useExpenseStore(); 

  useEffect(() => {

    getTotalIncome();
    getTotalExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const remainingBalance = (totalIncome - totalExpenses).toFixed(2);



  return (
      <div className='p-6 w-full'>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> 

            
                        <div className='py-5 px-6 border border-base-200 rounded-xl'>
                                <CardComponent/>
                        </div>

                        <div className='py-5 px-6 border border-base-200 rounded-xl flex flex-col items-center justify-center'>
                                <p className='mb-6 text-lg'>Main Balance</p>
                                <p className='text-5xl font-bold tracking-wide'>$ {remainingBalance}</p>

                        </div>

                        <div className='py-5 px-6 border border-base-200 rounded-xl'>
                                <p className='mb-6 text-lg'>Ads</p>
                               

                        </div>


                        <div className=' border border-base-200 rounded-xl py-5 px-6 col-span-1 lg:col-span-3'>
                            <TransactionTable/>
                        </div>

                   

                       
                              
                         
            </div>

            

      </div>
  )
}

export default Transactions
