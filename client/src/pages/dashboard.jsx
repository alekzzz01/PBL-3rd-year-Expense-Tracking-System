import React, {useEffect} from 'react';
import UserBarChart  from '../components/charts/dashboardAreaChart';
import TransactionTable from '../components/tables/transactionTable';

import useIncomeStore from '../store/incomeStore';
import useExpenseStore from '../store/expenseStore';
import useSavingStore from '../store/savingStore';


function Dashboard() {

  const { totalIncome, getTotalIncome } = useIncomeStore();
  const { totalExpenses, getTotalExpenses } = useExpenseStore();
  const { totalSavings, totalGoalAmount, getTotalSavingsForUser, getTotalGoalAmountForUser } = useSavingStore();

  useEffect(() => {
    // Fetch total income when the component mounts
    getTotalIncome();
    getTotalExpenses();
    getTotalSavingsForUser();
    getTotalGoalAmountForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedTotalIncome = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(totalIncome);
  const formattedTotalExpenses = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(totalExpenses);
  const formattedTotalSavings = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(totalSavings);
  const formattedTotalGoals = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(totalGoalAmount);
  


  return (
    <>

    <div className='p-6 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5'>

              <div className='flex flex-col gap-5 col-span-1 md:col-span-1 lg:col-span-2'>

                    <div className='py-5 px-6 border border-base-300 rounded-md' style={{ height: 500 }}>
                          <UserBarChart />
                    </div>

                    <div className='py-5 px-6 border border-base-300 rounded-md'>
                          <TransactionTable/>
                    </div>

              </div>
                

              <div className='flex flex-col gap-5'>
                <div className='py-5 px-6 flex flex-col gap-5 border border-base-300 rounded-md w-full'>  

                      <p className='text-lg font-medium'>Assets</p>

                      <div className='p-4 rounded-lg flex flex-col gap-6 ' style={{ backgroundColor:"#D8E2FD", color: "#35354E"}}>
                              <p className='text-sm font-normal'>Total Income</p>
                              <p className='text-2xl font-semibold'>$ {formattedTotalIncome}</p>
                      </div>

                      <div className='p-4 rounded-lg flex flex-col gap-6' style={{ backgroundColor:"#F9E1E1", color: "#4E3535"}}>
                              <p className='text-sm font-normal'>Total Expenses</p>
                              <p className='text-2xl font-semibold'>$ {formattedTotalExpenses}</p>
                      </div>

                      <div className='p-4 rounded-lg flex flex-col gap-6' style={{ backgroundColor:"#D8EAEA", color: "#3D4E35"}}>
                              <p className='text-sm font-normal'>Total Save</p>
                              <p className='text-2xl font-semibold'>$ {formattedTotalSavings}</p>
                      </div>
                       

                      <div className='p-4 rounded-lg flex flex-col gap-6' style={{ backgroundColor:"#D8DCEA", color: "#35364E"}}>
                              <p className='text-sm font-normal'>Goals</p>
                              <p className='text-2xl font-semibold'>$ {formattedTotalGoals}</p>
                      </div>
                       
         
                </div>  

                <div className='py-5 px-6 flex flex-col gap-5 border border-base-300 rounded-md w-full'> 

                  <p className='text-lg font-medium'>Events</p>

                    <div className='p-4 rounded-lg flex flex-col border border-base-300 gap-2 '>
                            <span className="badge">New</span>
                              <p className='font-medium'>Savings 101 - BGC - 05, Sept. 2022</p>
                              <p className='text-sm font-light'>Description of 101</p>
                    </div>

                    <div className='p-4 rounded-lg flex flex-col border border-base-300 gap-2 '>
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

export default Dashboard
