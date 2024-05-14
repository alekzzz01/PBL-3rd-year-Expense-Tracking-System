import React, {useState, useEffect} from 'react'

import LineChart from '../components/charts/userExpense';
import useExpenseStore from '../store/expenseStore';


function Expenses() {


  // FOR GETTINGS AND SETTING EXPENSES
  const {getTotalExpensePerMonth } = useExpenseStore(); 

  const { getExpenseItemsForUser, addExpense } = useExpenseStore();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenseItems = async () => {
    try {
      const { success, data, error } = await getExpenseItemsForUser();
      if (success) {
        setExpenses(data);
      } else {
        console.error('Failed to fetch expense items:', error);
      }
    } catch (error) {
      console.error('Error fetching expense items:', error);
    }
  };

  useEffect(() => {
    fetchExpenseItems();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getExpenseItemsForUser]);

  useEffect(() => {

    getTotalExpensePerMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const [formData, setFormData] = useState({
    expenseType: '',
    paymentMethod: '',
    category: '',
    amount: '',
    fullName: '',
  });



  // HANDLE SUBMIT OF EXPENSES TO SERVER


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
      const result = await addExpense(formData);
      if (result.success) {
        console.log('Expense added successfully:', result.data);
        setFormData({
          expenseType: '',
          paymentMethod: '',
          category: '',
          amount: '',
          fullName: '',
        });
        fetchExpenseItems();
        await getTotalExpensePerMonth(); // Fetch expenses again after successful submission
      } else {
        console.error('Failed to add expense:', result.error);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };


  // CHECK THE FORMDATA IS ALL FILLED OUT

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');

  // FORMAT DATE AND SET THE CURRENT DATE

  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const currentDate = new Date().toLocaleString('en-US', options);



  return (
    <div className='p-6 w-full flex flex-col gap-6'>

              <div className='flex items-center justify-between'>
                  <p className='text-xl font-bold'>Expenses</p>
                  <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Expense</button>
              </div>

              <div className='py-5 px-6 border border-base-200 rounded-xl' style={{ height: 400 }}>
                    <LineChart />
              </div>


              <div className='grid grid-cols-1 lg:grid-cols-3 gap-9'>


                      {/* NECESSITIES SECTION */}

                        <div className='flex flex-col gap-6'>
                          <p className='font-bold'>Necessities</p>
                          {expenses.filter(expense => expense.expenseType === 'Necessities').map((expense, index) => (
                            <div key={index} className='p-3 border border-base-300 rounded-xl'>
                              {/* Render expense details */}
                              <div className='flex flex-row items-center justify-between font-medium'>
                                <p>Category: {expense.category}</p>
                                <p>{expense.date}</p>
                              </div>
                              <div className='flex flex-row items-center justify-between font-light'>
                                <p>Payment: {expense.paymentMethod}</p>
                                <p>Expense: {expense.amount}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* SAVINGS SECTION */}

                        <div className='flex flex-col gap-6'>
                          <p className='font-bold'>Savings</p>
                          {expenses.filter(expense => expense.expenseType === 'Savings').map((expense, index) => (
                            <div key={index} className='p-3 border border-base-300 rounded-xl'>
                              {/* Render expense details */}
                              <div className='flex flex-row items-center justify-between font-medium'>
                                <p>Category: {expense.category}</p>
                                <p>{expense.date}</p>
                              </div>
                              <div className='flex flex-row items-center justify-between font-light'>
                                <p>Payment: {expense.paymentMethod}</p>
                                <p>Expense: {expense.amount}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* WANTS SECTION */}

                        <div className='flex flex-col gap-6'>
                          <p className='font-bold'>Wants</p>
                          {expenses.filter(expense => expense.expenseType === 'Wants').map((expense, index) => (
                            <div key={index} className='p-3 border border-base-300 rounded-xl'>
                              {/* Render expense details */}
                              <div className='flex flex-row items-center justify-between font-medium'>
                                <p>Category: {expense.category}</p>
                                <p>{expense.date}</p>
                              </div>
                              <div className='flex flex-row items-center justify-between font-light'>
                                <p>Payment: {expense.paymentMethod}</p>
                                <p>Expense: {expense.amount}</p>
                              </div>
                            </div>
                          ))}
                        </div>


    





              </div>


              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Expense</h3>

                
              
                    <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit}>


                      <select className='select select-bordered w-full' name="expenseType" value={formData.expenseType} onChange={handleChange}>
                        <option selected  >Type</option>
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
                      </select>

                      <select className='select select-bordered w-full' name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>

                      <input className='input input-bordered w-full' name='category' value={formData.category} onChange={handleChange} type="text" placeholder='Category (e.g. Food, Transportation, Bills)' /> 

                      <input className='input input-bordered w-full' name='amount' value={formData.amount} onChange={handleChange} type="text" placeholder='Amount' /> 

                      <input className='input input-bordered w-full' name='fullName' value={formData.fullName} onChange={handleChange} type="text" placeholder='Full Name' /> 



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                          <p className='font-normal'>{currentDate}</p>
                      </div>


                      <button className='btn' disabled={!isFormComplete}>Save</button>
                    
                    


                    </form>


                </div>
              </dialog>

      
    </div>
  )
}

export default Expenses
