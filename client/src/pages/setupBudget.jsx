import React, {useState, useEffect} from 'react'
import LineChart from '../components/charts/userIncome';

import IncomeTable from '../components/tables/incomeTable';
import useTransactionStore from '../store/transactionStore';

import useIncomeStore from '../store/incomeStore';



function SetupBudget() {

  // for fetching all transactions on the table

  const { fetchTransactions } = useTransactionStore(); // Access state and actions from the store

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const { getTotalIncomePerMonth } = useIncomeStore(); 
 
  useEffect(() => {
    getTotalIncomePerMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // ADD INCOME

  const addIncome = useIncomeStore((state) => state.addIncome); // Access the addExpense function from the store
  const [formData, setFormData] = useState({
  paymentMethod: '',
  category: '',
  amount: '',
  fullName: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addIncome(formData); // Call addExpense function with form data
      if (result.success) {
        // Handle success, e.g., show a success message
        console.log('Income added successfully:', result.data);
        setFormData({
          paymentMethod: '',
          category: '',
          amount: '',
          fullName: '',
        });

        // call the functions for fetch transactions, total income, total expenses, total income per month

        await fetchTransactions();
        await getTotalIncomePerMonth();

        
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to add expense:', result.error);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');






  return (
    <div className=' p-6 w-full flex flex-col gap-6'>

    <div className='flex items-center justify-between'>
                  <p className='text-2xl font-bold'>Income</p>
                  <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Income</button>
      </div>


      <div className='flex flex-col gap-5'>

                  <div className='border rounded-xl  py-5 px-6 w-full' style={{ height: 400 }}>
                    <LineChart/>
                  </div>

                  <div className=' border border-base-300 rounded-xl py-5 px-6' >
                      <IncomeTable/>
                  </div>  

      </div>

      
  
      <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                   
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Income</h3>

                
              
                    <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit} >

                      <select className='select select-bordered w-full' name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>


                    
                      <input className='input input-bordered w-full' name='category' value={formData.category} onChange={handleChange} type="text" placeholder='Category' /> 

                      <input className='input input-bordered w-full' name='amount' value={formData.amount} onChange={handleChange} type="text" placeholder='Amount' /> 

                      <input className='input input-bordered w-full' name='fullName' value={formData.fullName} onChange={handleChange} type="text" placeholder='Full Name' /> 

                      <button className='btn' disabled={!isFormComplete}>Save</button>
                    
                
                    </form>


                </div>
      </dialog>

    
</div>
  )
}

export default SetupBudget
