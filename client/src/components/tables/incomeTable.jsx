import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Eye,  Trash } from 'lucide-react';
// import DataTable, { createTheme } from 'react-data-table-component';
import useTransactionStore from '../../store/transactionStore'; 
import useIncomeStore from '../../store/incomeStore';


function IncomeTable() {
  const { transactions, fetchTransactions, isLoading, isError, errorMessage } = useTransactionStore();
  const { deleteIncome, viewIncome, updateIncome, getTotalIncomePerMonth } = useIncomeStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);

  
  // fetch items

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs 

  useEffect(() => {
    getTotalIncomePerMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // view and edit income

  const [selectedIncome, setSelectedIncome] = useState(null); 
  const [selectedExpenseId, setSelectedIncomeId] = useState(null); 
  const [initialIncomeState, setInitialIncomeState] = useState(null);
  

  
  const handleViewIncome = async (incomeId) => {
    setSelectedIncomeId(incomeId);
    
    const { success, data, error } = await viewIncome(incomeId);
    if (success) {
      setSelectedIncome(data);
      setInitialIncomeState(data);
      document.getElementById('ViewIncome').showModal(); 
    } else {
      console.error('Failed to fetch expense item:', error);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); 
      try {
        const { success, data, error } = await updateIncome(selectedIncome._id, selectedIncome);
        if (success) {
          fetchTransactions();
          getTotalIncomePerMonth();
          document.getElementById('ViewIncome').close(); 
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
      setSelectedIncome(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

  const isFormChanged = () => {
      // Check if selectedIncome is not null and initialIncomeState is set
      return selectedIncome && initialIncomeState && JSON.stringify(selectedIncome) !== JSON.stringify(initialIncomeState);
    };
  



  // for deleting one income and multiple income

    const handleDeleteIncome = (incomeId) => {
      // Call the deleteIncome function with the incomeId
      deleteIncome(incomeId)
        .then((response) => {
          fetchTransactions(); 
          setSelectedRows([]);
          console.log(response);
        })
        .catch((error) => {
          console.error('Error deleting income:', error);
          
        });
    };


    const handleDeleteSelected = async () => {
      try {
        for (const row of selectedRows) {
          await deleteIncome(row._id);
        }
        fetchTransactions();
        setSelectedRows([]);
        console.log('Rows deleted successfully');
      } catch (error) {
        console.error('Error deleting rows:', error);
      }
    };
    

    const openModal = (item) => {
      setItemToDelete(item);
      document.getElementById('delete_user').showModal(); 
    };
  
  
    const handleConfirmDelete = () => {
  
      handleDeleteIncome(itemToDelete._id);
      document.getElementById('delete_user').showModal(); 
      setItemToDelete(null);
    };
  
  

    
    const handleRowSelected = rows => {
      setSelectedRows(rows.selectedRows);
    };



  const columns = [
    {
      name: 'Income id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.tableType,
      sortable: true
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true
    },
   
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true
    },

    {
      cell: (row) => (
        <div >

        <button className='btn btn-ghost btn-circle'  onClick={() => handleViewIncome(row._id)}>
              <Eye size={16} color="#007bff" />
            </button>

          <button className='btn btn-ghost btn-circle' onClick={() => openModal(row)}>
            <Trash size={16} color="#dc3545" />
          </button>


        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
   
  ];

  // createTheme('solarized', {
  //   text: {
  //     primary: '#8884d8',
  //     secondary: '#7F6EFF',
  //   },
  //   background: {
  //     default: 'transparent',
  //   },
  //   context: {
  //     background: '#cb4b16',
  //     text: '#FFFFFF',
  //   },
  //   divider: {
  //     default: '#bababa',
  //   },
  //   action: {
  //     button: 'rgba(0,0,0,.54)',
  //     hover: 'rgba(0,0,0,.08)',
  //     disabled: 'rgba(0,0,0,.12)',
  //   },
  // }, 'dark');




  const incomeTransactions = transactions.filter(transaction => transaction.tableType === 'Income');

  
  return (
    <>

      <div className='flex items-center justify-between'>


        <p className='mb-6 text-lg font-medium'>Income List</p>
      
        {selectedRows.length > 0 && (
            <button className='border border-base-300 btn' onClick={handleDeleteSelected}> <Trash
            size={16}
            color="#dc3545"  /></button>
          )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {errorMessage}</div>
      ) : (
        <DataTable
          columns={columns}
          data={incomeTransactions}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
      
          pagination
          theme="solarized"
        />
      )}



      <dialog id="delete_user" className="modal">
        <div className="modal-box">
         
          <p className="py-4">Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <form method="dialog">
              <div className='w-full flex justify-end items-center gap-4'>
                <button className="btn" onClick={() => setItemToDelete(null)} >Close</button>
                <button className='btn bg-red-200 text-red-700'  onClick={handleConfirmDelete}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>


      
      <dialog id="ViewIncome" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-6">View Income</h3>

          <form action="" className='flex flex-col gap-3' onSubmit={handleSaveChanges}>

            <label className="input input-bordered flex items-center gap-2">
              Type:
              <input
                type="text"
                className="grow"
                name="incomeType"
                value={selectedIncome && selectedIncome.incomeType}
                onChange={handleInputChange}
                readOnly
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Category:
              <input
                type="text"
                className="grow"
                name="category"
                value={selectedIncome && selectedIncome.category}
                onChange={handleInputChange}
              />
            </label>

            <select
              className='select select-bordered w-full'
              name="paymentMethod"
              value={selectedIncome && selectedIncome.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="E-wallet">E-Wallet</option>
            </select>

            <label className="input input-bordered flex items-center gap-2">
              Amount:
              <input
                type="text"
                className="grow"
                name="amount"
                value={selectedIncome && selectedIncome.amount}
                onChange={handleInputChange}
              />
            </label>

            <button className={`btn btn-primary${isFormChanged() ? '' : ' disabled'}`} disabled={!isFormChanged()}>Save Changes</button>

          </form>

        </div>
      </dialog>

    </>
  );
}

export default IncomeTable;
