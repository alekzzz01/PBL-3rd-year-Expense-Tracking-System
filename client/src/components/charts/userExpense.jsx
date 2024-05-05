import React, { useEffect } from 'react';
import useExpenseStore from '../../store/expenseStore'; 

import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, Legend  } from 'recharts';



function UserLineChart() {

  const { totalExpensePerMonth, getTotalExpensePerMonth } = useExpenseStore(); 

  useEffect(() => {
    getTotalExpensePerMonth();

  }, [getTotalExpensePerMonth]);


      // Define the initial data with placeholders
  const initialData = [
    { name: 'Jan', expense: 0 },
    { name: 'Feb', expense: 0 },
    { name: 'Mar', expense: 0 },
    { name: 'Apr', expense: 0 },
    { name: 'May', expense: 0 },
    { name: 'Jun', expense: 0},
    { name: 'Jul', expense: 0 },
    { name: 'Aug', expense: 0 },
    { name: 'Sep', expense: 0 },
    { name: 'Oct', expense: 0 },
    { name: 'Nov', expense: 0 },
    { name: 'Dec', expense: 0 }
  ];

    // Merge the fetched total expenses per month into the initial data
    const updatedData = initialData.map((monthData, index) => {

      const totalExpenseData = totalExpensePerMonth.find(expense => expense._id.month === index + 1);
        return {
          ...monthData,
          expense: totalExpenseData ? totalExpenseData.totalExpense : 0
        };
      });
    


  return (
    <div className='relative w-full h-full overflow-x-auto'>

        <LineChart width={1500} height={450} data={updatedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
      
        </LineChart>
            
    </div>
  )
}

export default UserLineChart
