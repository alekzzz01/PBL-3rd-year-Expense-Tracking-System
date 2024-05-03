import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import useTransactionStore from '../../store/transactionStore'; // Import your Zustand store

function TransactionTable() {
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
   
  ];

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

  
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {errorMessage}</div>
      ) : (
        <DataTable
          columns={columns}
          data={transactions}
          selectableRows
          fixedHeader
          pagination
        />
      )}
    </>
  );
}

export default TransactionTable;
