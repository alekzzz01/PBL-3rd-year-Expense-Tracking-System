import React, { useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import useTransactionStore from '../../store/transactionStore'; // Import your Zustand store

function IncomeTable() {
  const { transactions, fetchTransactions, isLoading, isError, errorMessage } = useTransactionStore(); // Access state and actions from the store

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs once

  const columns = [
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
   
  ];

  createTheme('solarized', {
    text: {
      primary: '#7F6EFF',
      secondary: '#7F6EFF',
    },
    background: {
      default: 'transparent',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#bababa',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  // const handleDeleteItem = async () => {
  //   try {
  //     if (tableType === 'expense') {
  //       await deleteExpenseItem(itemId);
  //     } else if (tableType === 'income') {
  //       await deleteIncomeItem(itemId);
  //     }
  //     // Handle success (e.g., update state, show notification)
  //   } catch (error) {
  //     // Handle error (e.g., show error message)
  //   }
  // };


  const incomeTransactions = transactions.filter(transaction => transaction.tableType === 'Income');

  
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {errorMessage}</div>
      ) : (
        <DataTable
          columns={columns}
          data={incomeTransactions}
          selectableRows
          fixedHeader
          pagination
          theme="solarized"
        />
      )}
    </>
  );
}

export default IncomeTable;
