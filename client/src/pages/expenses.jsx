import React, {useState, useEffect, useRef} from 'react'
import LineChart from '../components/charts/userExpense';
import useExpenseStore from '../store/expenseStore';
import axios from 'axios';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../store/url';

function Expenses() {


  
  // FOR GETTINGS ALL EXPENSE
  
  const { getTotalExpensePerMonth, getExpenseItemsForUser, addExpense, getExpenseItemById, updateExpenseItem } = useExpenseStore();
  const [expenses, setExpenses] = useState([]);
  const [filterType, setFilterType] = useState('');

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
    getTotalExpensePerMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTotalExpensePerMonth, getExpenseItemsForUser]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFilterType(value);
  };

  
  const filteredExpenses = filterType ? expenses.filter((expense) => expense.expenseType === filterType) : expenses;


  //  form of add expenses

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const [formData, setFormData] = useState({
    expenseType: '',
    paymentMethod: '',
    category: '',
    amount: '',
    fullName: '',
  });


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


  const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');


  //

  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const currentDate = new Date().toLocaleString('en-US', options);


  // viewing and editing expenses

  const [selectedExpense, setSelectedExpense] = useState(null); 
  const [selectedExpenseId, setSelectedExpenseId] = useState(null); 
  const [initialExpenseState, setInitialExpenseState] = useState(null);


    
  const handleViewExpense = async (expenseId) => {
    setSelectedExpenseId(expenseId);
    
    const { success, data, error } = await getExpenseItemById(expenseId);
    if (success) {
      setSelectedExpense(data);
      setInitialExpenseState(data);
      document.getElementById('ViewExpense').showModal(); 
    } else {
      console.error('Failed to fetch expense item:', error);
    }
  };


  const handleSaveChanges = async (e) => {
    e.preventDefault(); 
      try {
        const { success, data, error } = await updateExpenseItem(selectedExpense._id, selectedExpense);
        if (success) {
          fetchExpenseItems();
          getTotalExpensePerMonth();
          document.getElementById('ViewExpense').close(); 
        } else {
          console.error('Failed to save changes:', error);
          // Handle failure (e.g., show error message)
        }
      } catch (error) {
        console.error('Error saving changes:', error);
        
      }
    };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSelectedExpense(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

  const isFormChanged = () => {
      // Check if selectedIncome is not null and initialIncomeState is set
      return selectedExpense && initialExpenseState && JSON.stringify(selectedExpense) !== JSON.stringify(initialExpenseState);
    };



  // scan or upload the expense

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRetake = () => {
    setIsCapturing(false); // Reset isCapturing state to allow capturing again
  };
  

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCapturing(true);
    toast.success('Image captured successfully');
  };

  const handleSubmitScan = async (e) => {
    e.preventDefault();
    let imageData;
  
    if (useWebcam) {
      imageData = await fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      imageData = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${baseUrl}/expense/scan-receipt`, { imageData }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setResult(response.data.data);
      toast.success('Expense added successfully');
      fetchExpenseItems();
      await getTotalExpensePerMonth();
      document.getElementById('scan').close(); 
    } catch (error) {
      toast.error('Error uploading file')
      console.error('Error uploading file:', error);
    }
  };
  
  


  return (
    <div className='p-6 w-full flex flex-col gap-6'>

              <div className='flex items-center justify-between'>
                  <p className='text-xl font-bold'>Expenses</p>
                  <div>
                    <button className='btn mr-3' onClick={()=>document.getElementById('addExpense').showModal()}>Add Expense</button>
                    <button className='btn' onClick={()=>document.getElementById('scan').showModal()}>Scan Receipt</button>
                  </div>
               
              </div>

              <div className='py-5 px-6 border border-base-200 rounded-xl' style={{ height: 400 }}>
                    <LineChart />
              </div>

          

              <div className='flex flex-col gap-6'>

                    <div className='flex items-center justify-between'>
                      <p className='font-bold'>Type: <span className='font-medium'>{filterType}</span></p> 
  
                      <select className='select select-bordered' value={filterType} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
                      </select>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                    {filteredExpenses.map((expense, index) => (
                        
                      <button key={index} className='p-3 border border-base-300 rounded-xl col-span-2' onClick={() => handleViewExpense(expense._id)} >
                        {/* Render expense details */}
                        <div className='flex flex-row items-center justify-between font-medium'>
                          <p>Category: {expense.category}</p>
                          <p>{expense.date}</p>
                        </div>
                        <div className='flex flex-row items-center justify-between font-light'>
                          <p>Payment: {expense.paymentMethod}</p>
                          <p>Expense: {expense.amount}</p>
                        </div>

                      
                      </button>
                    ))}

                    </div>
                    
              </div>
          

              <dialog id="addExpense" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Expense</h3>

                
              
                    <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit}>


                      <select className='select select-bordered w-full' name="expenseType" value={formData.expenseType} onChange={handleChangeForm}>
                        <option selected  >Type</option>
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
                      </select>

                      <select className='select select-bordered w-full' name="paymentMethod" value={formData.paymentMethod} onChange={handleChangeForm}>
                        <option selected>Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit card">Credit card</option>
                        <option value="Debit card">Debit card</option>
                        <option value="E-wallet">E-Wallet</option>
                      </select>

                      <input className='input input-bordered w-full' name='category' value={formData.category} onChange={handleChangeForm} type="text" placeholder='Category (e.g. Food, Transportation, Bills)' /> 

                      <input className='input input-bordered w-full' name='amount' value={formData.amount} onChange={handleChangeForm} type="text" placeholder='Amount' /> 

                      <input className='input input-bordered w-full' name='fullName' value={formData.fullName} onChange={handleChangeForm} type="text" placeholder='Full Name' /> 



                      <div className='flex justify-between items-center px-4 mt-6'>
                          <p className='font-medium'>Date and Time:</p>
                          <p className='font-normal'>{currentDate}</p>
                      </div>


                      <button className='btn' disabled={!isFormComplete}>Save</button>
                    
                    


                    </form>


                </div>
              </dialog>

              <dialog id="ViewExpense" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg mb-6">View Expense</h3>



                  <form action="" onSubmit={handleSaveChanges} className='flex flex-col gap-3'>


                    <select
                      className='select select-bordered w-full'
                      name="expenseType"
                      value={selectedExpense && selectedExpense.expenseType}
                      onChange={handleInputChange}
                    >
                        <option value="Necessities">Necessities</option>
                        <option value="Savings">Savings</option>
                        <option value="Wants">Wants</option>
                    </select>

                    <select
                      className='select select-bordered w-full'
                      name="paymentMethod"
                      value={selectedExpense && selectedExpense.paymentMethod}
                      onChange={handleInputChange}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Credit card">Credit card</option>
                      <option value="Debit card">Debit card</option>
                      <option value="E-wallet">E-Wallet</option>
                    </select>



                    <label className="input input-bordered flex items-center gap-2">
                      Category:
                      <input
                        type="text"
                        className="grow"
                        name="category"
                        value={selectedExpense && selectedExpense.category}
                        onChange={handleInputChange}
                       
                      />
                    </label>
                  
                 
                    <label className="input input-bordered flex items-center gap-2">
                      Amount:
                      <input
                        type="text"
                        className="grow"
                        name="amount"
                        value={selectedExpense && selectedExpense.amount}
                        onChange={handleInputChange}
                       
                      />
                    </label>


                    <button className={`btn btn-primary${isFormChanged() ? '' : ' disabled'}`} disabled={!isFormChanged()}>Save Changes</button>

                  </form>  
                 
                </div>
              </dialog>

                  
              <dialog id="scan" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 className="font-bold text-lg mb-6">Upload or Scan Expense</h3>

                      <div>

                      <div className='mb-12 flex items-center gap-4'>
                        <label className='flex items-center gap-2'>
                          <input
                            type="radio"
                            className="radio"
                            name="uploadOption"
                            value="upload"
                            checked={!useWebcam}
                            onChange={() => setUseWebcam(false)}
                          />
                          Upload Image
                        </label>
                        <label className='flex items-center gap-2'>
                          <input
                            type="radio"
                            className="radio"
                            name="uploadOption"
                            value="scan"
                            checked={useWebcam}
                            onChange={() => setUseWebcam(true)}
                          />
                          Use Webcam
                        </label>
                      </div>

                      <form onSubmit={handleSubmitScan}>
                        {useWebcam ? (
                          <div> 
                            <div>
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                              />
                              {!isCapturing ? (
                                <button type="button" className="btn w-full my-5" onClick={handleCapture}>Capture Image</button>
                              ) : (
                                <>
                                  
                                  <button type="button" className="btn w-full my-5" onClick={handleRetake}>Retake</button>
                                  <img src={capturedImage} alt="Captured" className='my-5' />
                                  <p className='text-center mb-5'>Captured Image</p>
                                 
                                </>
                              )}
                            </div>

                          
                          </div>
                        ) : (
                          <input type="file" className="file-input file-input-bordered w-full mb-20" onChange={handleFileChange} />
                        )}
                        <button type="submit" className='btn btn-primary w-full'>Upload and Scan Receipt</button>
                      </form>
                      {/* {result && <pre>{JSON.stringify(result, null, 2)}</pre>} */}
                    </div>
                                
            
                    </div>
              </dialog>

      

      
    </div>
  )
}

export default Expenses
