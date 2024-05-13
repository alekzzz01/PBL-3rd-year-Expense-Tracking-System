import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { Pen, Trash } from 'lucide-react';
import useTransactionStore from '../../store/transactionStore';
import useIncomeStore from '../../store/incomeStore';
import useExpenseStore from '../../store/expenseStore';

function TransactionTable() {
  const { transactions, fetchTransactions, isLoading, isError, errorMessage } = useTransactionStore(); // Access state and actions from the store
  const { deleteIncome } = useIncomeStore();
  const { deleteExpense } = useExpenseStore();
  const [selectedRows, setSelectedRows] = useState([]);



  useEffect(() => {
    fetchTransactions(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs once


  // for Individual items for deletion

  const handleDeleteIncome = (incomeId) => {
    // Call the deleteIncome function with the incomeId
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
    // Call the deleteIncome function with the incomeId
    deleteExpense(expenseItemId)
      .then((response) => {
        fetchTransactions(); 
        console.log(response);
      })
      .catch((error) => {
        console.error('Error deleting income:', error);
        
      });
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

          <button>
              <Pen     
              size={16}
              color="#007bff"   />
          </button> 

          <button onClick={() => {
            if (row.tableType === 'Income') {
              handleDeleteIncome(row._id);
            } else if (row.tableType === 'Expense') {
              handleDeleteExpense(row._id);
            }
          }}>
          <Trash
              size={16}
              color="#dc3545"  />
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


    
    </>
  );
}

export default TransactionTable;
