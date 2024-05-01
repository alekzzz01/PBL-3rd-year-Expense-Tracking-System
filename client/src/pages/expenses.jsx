import React, {useState} from 'react'
import UserBarChart  from '../components/charts/userBarChart';
import useExpenseStore from '../store/expenseStore';


function Expenses() {

    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    
    const currentDate = new Date().toLocaleString('en-US', options);


    const addExpense = useExpenseStore((state) => state.addExpense); // Access the addExpense function from the store
    const [formData, setFormData] = useState({
    expenseType: '',
    paymentMethod: '',
    category: '',
    amount: '',
    fullName: '',
    // Add more fields as needed
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
      const result = await addExpense(formData); // Call addExpense function with form data
      if (result.success) {
        // Handle success, e.g., show a success message
        console.log('Expense added successfully:', result.data);
        setFormData({
          expenseType: '',
          paymentMethod: '',
          category: '',
          amount: '',
          fullName: '',
        });
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
    <div className=' p-9 w-full flex flex-col gap-6'>

              <div className='flex items-center justify-between'>
                  <p className='text-xl font-bold'>EXPENSES</p>
                  <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Expense</button>
              </div>

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


              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Expense</h3>

                
              
                    <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit}>


                      <select className='p-3 border rounded-xl w-full' name="expenseType" value={formData.expenseType} onChange={handleChange}>
                        <option selected>Type</option>
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
                      </select>

                      <select className='p-3 border rounded-xl w-full' name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>

                      <input className='p-3 border rounded-xl w-full' name='category' value={formData.category} onChange={handleChange} type="text" placeholder='Category (e.g. Food, Transportation, Bills)' /> 

                      <input className='p-3 border rounded-xl w-full' name='amount' value={formData.amount} onChange={handleChange} type="text" placeholder='Amount' /> 

                      <input className='p-3 border rounded-xl w-full' name='fullName' value={formData.fullName} onChange={handleChange} type="text" placeholder='Full Name' /> 



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
