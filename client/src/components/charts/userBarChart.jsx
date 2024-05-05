import React, { useEffect } from 'react';
import useExpenseStore from '../../store/expenseStore'; 
import useIncomeStore from '../../store/incomeStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function UserBarChart() {
  const { totalExpensePerMonth, getTotalExpensePerMonth } = useExpenseStore(); 
  const { totalIncomePerMonth, getTotalIncomePerMonth } = useIncomeStore(); 

  useEffect(() => {
    getTotalExpensePerMonth();
    getTotalIncomePerMonth();
  }, [getTotalExpensePerMonth, getTotalIncomePerMonth]);

  // Define the initial data with placeholders
  const initialData = [
    { name: 'Jan', income: 0, expense: 0 },
    { name: 'Feb', income: 0, expense: 0 },
    { name: 'Mar', income: 0, expense: 0 },
    { name: 'Apr', income: 0, expense: 0 },
    { name: 'May', income: 0, expense: 0 },
    { name: 'Jun', income: 0, expense: 0 },
    { name: 'Jul', income: 0, expense: 0 },
    { name: 'Aug', income: 0, expense: 0 },
    { name: 'Sep', income: 0, expense: 0 },
    { name: 'Oct', income: 0, expense: 0 },
    { name: 'Nov', income: 0, expense: 0 },
    { name: 'Dec', income: 0, expense: 0 }
  ];

  // Merge the fetched total expenses per month into the initial data
  const updatedData = initialData.map((monthData, index) => {
    const totalExpenseData = totalExpensePerMonth.find(expense => expense._id.month === index + 1);
    const totalIncomeData = totalIncomePerMonth.find(income => income._id.month === index + 1);

    return {
      ...monthData,
      expense: totalExpenseData ? totalExpenseData.totalExpense : 0,
      income: totalIncomeData ? totalIncomeData.totalIncome : 0
    };
  });

  return (
    <div className='relative w-full h-full'>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={updatedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#57586F' }} />
          <YAxis yAxisId="left" orientation="left" stroke="#57586F" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="income" fill="#3346DF" />
          <Bar yAxisId="left" dataKey="expense" fill="#7F6EFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserBarChart;
