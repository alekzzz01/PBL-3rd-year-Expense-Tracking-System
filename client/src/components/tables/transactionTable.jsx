import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { Trash } from 'lucide-react';
import useTransactionStore from '../../store/transactionStore';
import useIncomeStore from '../../store/incomeStore';
import useExpenseStore from '../../store/expenseStore';

function TransactionTable() {
  const { transactions, fetchTransactions, isLoading, isError, errorMessage } = useTransactionStore(); // Access state and actions from the store
  const { deleteIncome, totalIncome, getTotalIncome } = useIncomeStore();
  const { deleteExpense, totalExpenses, getTotalExpenses } = useExpenseStore();
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [itemToDelete, setItemToDelete] = useState(null);


  useEffect(() => {
    fetchTransactions(); 
    getTotalIncome();
    getTotalExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs once


  // for Individual items for deletion

  const handleDeleteIncome = (incomeId) => {
 
    deleteIncome(incomeId)
      .then((response) => {
        fetchTransactions(); 
        console.log(response);
      })
      .catch((error) => {
        console.error('Error deleting income:', error);
        
      });
  };

  const handleDeleteExpense = (expenseItemId) => {

    deleteExpense(expenseItemId)
      .then((response) => {
        fetchTransactions(); 
        console.log(response);
      })
      .catch((error) => {
        console.error('Error deleting income:', error);
        
      });
  };

  const openModal = (item) => {
    setItemToDelete(item);
    document.getElementById('delete_user').showModal(); 
  };


  const handleConfirmDelete = () => {
    if (itemToDelete.tableType === 'Income') {
      handleDeleteIncome(itemToDelete._id);
    } else if (itemToDelete.tableType === 'Expense') {
      handleDeleteExpense(itemToDelete._id);
    }
    getTotalIncome();
    getTotalExpenses();
    document.getElementById('delete_user').showModal(); 
    setItemToDelete(null);
  };



  // for Selected Items for deletion

  
  const handleDeleteSelected = async () => {
    try {
      for (const row of selectedRows) {
        if (row.tableType === 'Income') {
          await deleteIncome(row._id);
        } else if (row.tableType === 'Expense') {
          await deleteExpense(row._id);
        }
      }
      fetchTransactions();
      setSelectedRows([]);
      console.log('Rows deleted successfully');
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  };
  

  const handleRowSelected = rows => {
    setSelectedRows(rows.selectedRows);
  };



  const columns = [
    {
      name: 'ID',
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
      name: 'Payment Method',
      selector: row => row.paymentMethod,
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
        <div className='flex flex-wrap items-center gap-3'>

        

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


  
  
  return (
    <>

     <div className='flex items-center justify-between'>

        <p className='mb-6 text-lg font-medium'>Transactions List</p>

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
        <>
         
          <DataTable
            columns={columns}
            data={transactions}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
       
            pagination
            theme="solarized"
          />
        </>
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



    
    </>
  );
}

export default TransactionTable;
