import React, { useEffect } from 'react';
import useIncomeStore from '../../store/incomeStore';

import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, Legend  } from 'recharts';



function UserLineChart() {

    const { totalIncomePerMonth, getTotalIncomePerMonth } = useIncomeStore(); 


    useEffect(() => {
    
        getTotalIncomePerMonth();
    }, [ getTotalIncomePerMonth]);

      // Define the initial data with placeholders
  const initialData = [
    { name: 'Jan', income: 0 },
    { name: 'Feb', income: 0 },
    { name: 'Mar', income: 0 },
    { name: 'Apr', income: 0 },
    { name: 'May', income: 0 },
    { name: 'Jun', income: 0 },
    { name: 'Jul', income: 0 },
    { name: 'Aug', income: 0 },
    { name: 'Sep', income: 0 },
    { name: 'Oct', income: 0 },
    { name: 'Nov', income: 0 },
    { name: 'Dec', income: 0 }
  ];

    // Merge the fetched total expenses per month into the initial data
    const updatedData = initialData.map((monthData, index) => {

        const totalIncomeData = totalIncomePerMonth.find(income => income._id.month === index + 1);
        return {
          ...monthData,
          income: totalIncomeData ? totalIncomeData.totalIncome : 0
        };
      });
    


  return (
    <div className='relative w-full h-full overflow-x-auto'>
    
        <LineChart width={1000} height={250} data={updatedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" />
      
        </LineChart>
            
    </div>
  )
}

export default UserLineChart
