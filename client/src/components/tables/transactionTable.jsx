import React from 'react'
import DataTable from 'react-data-table-component'

function transactionTable() {


  const columns = [
    {
        name: 'Categories',
        selector: row => row.category,
        sortable: true
    }, 
    
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true
    }, 
    {
      name: 'Type',
      selector: row => row.type,
      sortable: true
    }, 

    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true
    }, 
 
  ];

  const data = [
    {
      id: 1,
      category: 'Food',
      amount: '1000.00',
      date: '04/21/2024',
      type: 'Wants',
    },
    {
      id: 1,
      category: 'Food',
      amount: '1000.00',
      date: '04/21/2024',
      type: 'Wants',
    },
    {
      id: 1,
      category: 'Snacks',
      amount: '1000.00',
      date: '04/21/2024',
      type: 'Expenses',
    },
    {
      id: 1,
      category: 'Income',
      amount: '1000.00',
      date: '04/21/2024',
      type: 'Income',
    },



  ]


  return (
      <>
          <DataTable
          columns={columns}
          data={data}
          selectableRows
          fixedHeader
          pagination
          >
            

          </DataTable>
      </>
  )
}

export default transactionTable
