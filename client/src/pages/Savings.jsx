import React, { useState, useEffect} from 'react'
import { EllipsisVertical } from 'lucide-react';
import useSavingsStore from '../store/savingStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Savings() {

    const { getSavingItemsForUser, savings, getSavingItemById, addAmountItem, createSavingItem } = useSavingsStore();
    const [selectedSavings, setSelectedSavings] = useState(null);
    const [selectedSavingsId, setSelectedSavingsId] = useState(null);
    const [filterOption, setFilterOption] = useState('All');


    const [formData, setFormData] = useState({
        amount: '',
        date: '',
        note: ''
    });
    const [isFormComplete, setIsFormComplete] = useState(false);

      
    
    const [savingFormData, setSavingFormData] = useState({
        name: '',
        goalAmount: '',
        finishBy: '',
        frequency: '',
    });

    useEffect(() => {
        getSavingItemsForUser();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    // for viewing individual savings


    const handleViewSaving = async (savingsItemId) => {
        setSelectedSavings(savingsItemId);
        try {
            const data = await getSavingItemById(savingsItemId);
            setSelectedSavings(data);
            document.getElementById('ViewSaving').showModal();
        } catch (error) {
            console.error('Failed to fetch saving item:', error);
        }
    };



    // add amount per savings 
    const handleAddAmount = (savingsItemId) => {
        setSelectedSavingsId(savingsItemId);
        document.getElementById('addAmount').showModal();
    };

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
    
            const result = await addAmountItem(selectedSavingsId, formData);
            if (result.success) {
                console.log('Item added successfully:', result.data);
                setFormData({
                    amount: '',
                    date: '',
                    note: ''
                });
                getSavingItemsForUser();
            } else {
                console.error('Failed to add item:', result.error);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    

    useEffect(() => {
        setIsFormComplete(Object.values(formData).every((value) => value.trim() !== ''));
    }, [formData]);



    //  form of add 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSavingFormData({ ...savingFormData, [name]: value });
    };

    const handleSubmitAddSavings = async (e) => {
        e.preventDefault();
        try {
            console.log('Saving form data:', savingFormData); // Log saving form data before sending the request
            const response = await createSavingItem(savingFormData);
            console.log('Response from backend:', response); // Log the response from the backend
            if (response.success) {
                toast.success('Savings created successfully');
                // Clear the form fields after successful creation
                setSavingFormData({
                    name: '',
                    goalAmount: '',
                    finishBy: '',
                    frequency: '',
                });
                // Optionally, you can fetch the updated list of savings
                getSavingItemsForUser();
            } else {
                toast.error('Failed to create savings');
            }
        } catch (error) {
            console.error('Error creating savings:', error);
            toast.error('Failed to create savings');
        }
    };
    
  

    const formatFinishByDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
        
    };

    

  return (

    <>

        <div className='p-6 w-full flex flex-col gap-6'>

            <div className='flex items-center justify-between'>
                  <p className='text-xl font-bold'>Savings</p>
                  <button className='btn' onClick={()=>document.getElementById('addSavings').showModal()}>Add Savings</button>
            </div>

            <div role="tablist" className="tabs tabs-bordered w-full 2xl:w-1/4">
                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="All"
                        checked={filterOption === 'All'}
                        onChange={() => setFilterOption('All')}
                    />
            
                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Achieved"
                        checked={filterOption === 'Achieved'}
                        onChange={() => setFilterOption('Achieved')}
                    />
                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="In Progress"
                        checked={filterOption === 'In Progress'}
                        onChange={() => setFilterOption('In Progress')}
                    />
            </div>

           
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5'>


                {savings
                        .filter((saving) => {
                            if (filterOption === 'All') return true;
                            if (filterOption === 'Achieved') return saving.totalAmountItems >= saving.goalAmount;
                            if (filterOption === 'In Progress') return saving.totalAmountItems < saving.goalAmount;
                            return true;
                        })
                        .map((saving, index) => (

                

                        <div className='border border-base-200 rounded-md'>

                            <div className='py-5 px-6 flex items-center justify-between'>
                                <p className='text-2xl font-bold'>{saving.name}</p>

                    

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1"><EllipsisVertical size={20} /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><button>Edit</button></li>
                                        <li><button>Delete</button></li>
                                      
                                    </ul>
                                </div>
                                

                            </div>

                            <div className='grid grid-cols-2 gap-5 pb-5 px-6'>

                                <div>
                              
                                    <p className='text-sm font-normal'>Current Save</p>
                                    <p className='text-xl font-semibold'>$ {saving.totalAmountItems}</p>
                                </div>

                                <div>
                                    <p className='text-sm font-normal'>Saving Goal</p>
                                    <p className='text-xl font-semibold'>$ {saving.goalAmount}</p>
                                </div>

                            </div>


                            <div className='px-6'>
                                <progress className="progress progress-primary w-full" value={saving.totalAmountItems} max={saving.goalAmount}></progress>
                            </div>

                            
                            <div className='grid grid-cols-2 gap-5 py-5 px-6'>

                                <div>
                                    <p className='text-sm font-normal'>Finish By</p>
                                    <p className='text-xl font-semibold'>{formatFinishByDate(saving.finishBy)}</p>
                                </div>

                                <div>
                                    <p className='text-sm font-normal'>Frequency</p>
                                    <p className='text-xl font-semibold'>{saving.frequency}</p>
                                </div>

                            </div>

                            <div className='divider'></div>

                            <div className='w-full text-center pb-5'>
                                <button key={index} className='btn font-bold mr-6' onClick={() => handleViewSaving(saving._id)}>View Saving</button>
                                <button className='btn font-bold' onClick={() => handleAddAmount(saving._id)}  disabled={saving.totalAmountItems >= saving.goalAmount}>Add Amount</button>
                            </div>


                        </div>
                    ))}

                       

            </div>





            
            <dialog id="addSavings" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Savings</h3>

                
              
                    <form onSubmit={handleSubmitAddSavings} className='flex flex-col gap-3' >


                    
                      <input className='input input-bordered w-full' name='name'  type="text" placeholder='Name'  value={savingFormData.name}
                            onChange={handleChange}  /> 

                      <input className='input input-bordered w-full' name='goalAmount'  type="text" placeholder='Amount' value={savingFormData.goalAmount}
                            onChange={handleChange} />
                      
                      <input className='input input-bordered w-full' name='finishBy' type="date" placeholder='Date'   min={(new Date()).toISOString().split('T')[0]}value={savingFormData.finishBy}
                            onChange={handleChange}
 />

                      <select className='select select-bordered w-full' name="frequency" value={savingFormData.frequency}
                            onChange={handleChange} >
                        <option selected >Frequency</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>




                      <button className='btn'>Save</button>
                    
                    


                    </form>


                </div>
            </dialog>

            <dialog id="addAmount" className="modal">
                <div className="modal-box">

                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>


                    <form onSubmit={handleSubmit}>
                      
                        <h3 className="font-bold text-lg mb-6">Add Amount</h3>
                        <div className='flex flex-col gap-3'>
                            <input className='input input-bordered w-full' name='amount' value={formData.amount} onChange={handleChangeForm} type="text" placeholder='Amount' />
                            <input className='input input-bordered w-full' name='date' value={formData.date} onChange={handleChangeForm} type="date" placeholder='Date'   min={(new Date()).toISOString().split('T')[0]} />
                            <input className='input input-bordered w-full' name='note' value={formData.note} onChange={handleChangeForm} type="text" placeholder='Note' />
                            <button className='btn' disabled={!isFormComplete}>Save</button>
                        </div>
                    </form>
                </div>
            </dialog> 
            
            
            <dialog id="ViewSaving" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg mb-6">View Savings</h3>

                  <div className='flex flex-col'>
                    <p className='font-medium mb-3'>Name: <span className='font-normal'>{selectedSavings && selectedSavings.name} </span> </p>
               
                    <p className='font-medium mb-3'>Earn: <span className='font-normal'>₱ {selectedSavings && selectedSavings.budgetPerFrequency && selectedSavings.budgetPerFrequency.toFixed(2)}</span> / <span className='font-normal'>{selectedSavings && selectedSavings.frequency}</span></p>   
               
                    <p className='font-medium'>Goal Amount: <span className='font-normal'>₱ {selectedSavings && selectedSavings.goalAmount && selectedSavings.goalAmount.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>

                    
                    <div className='divider'></div>


                    <div className='font-bold'>
                        History:
                        {selectedSavings && selectedSavings.amountItems && selectedSavings.amountItems.length > 0 ? (
                            <ul className='font-normal my-3 flex flex-col gap-3'>
                                {selectedSavings.amountItems.map((item, index) => (
                                    <li key={index} className='flex items-center justify-between'>
                                        <p className='font-medium'>{new Date(item.date).toLocaleString()}</p>
                                        <p className='font-medium text-green-500'>+ ₱ {item.amount.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="font-normal">No records to display</p>
                        )}
                    </div>



                  </div>
                </div>
              </dialog>


      
        </div>


    </>
   
  )
}

export default Savings
