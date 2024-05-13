import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Pen, Trash } from 'lucide-react';
// import DataTable, { createTheme } from 'react-data-table-component';
import useTransactionStore from '../../store/transactionStore'; 
import useIncomeStore from '../../store/incomeStore';


function IncomeTable() {
  const { transactions, fetchTransactions, isLoading, isError, errorMessage } = useTransactionStore();
  const { deleteIncome } = useIncomeStore();
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs 
  

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
        <div className='flex flex-wrap items-center gap-3'>

          <button>
              <Pen     
              size={16}
              color="#007bff"   />
          </button> 

          <button  onClick={() => handleDeleteIncome(row._id)}>
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
    </>
  );
}

export default IncomeTable;
