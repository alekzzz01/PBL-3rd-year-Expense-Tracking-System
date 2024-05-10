import React, { useEffect, useState } from 'react';
import useExpenseStore from '../../store/expenseStore'; 
import useIncomeStore from '../../store/incomeStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer, AreaChart, Area } from 'recharts';

function UserBarChart() {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State variable to store the selected year

  const handleChange = (date) => {
    setSelectedYear(date.getFullYear()); // Update the selected year when the user changes it in the date picker
  };


  // total expense, total income per month

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

    // // Merge the fetched total expenses per month into the initial data
    // const updatedData = initialData.map((monthData, index) => {
    //   const totalExpenseData = totalExpensePerMonth.find(expense => expense._id.month === index + 1);
    //   const totalIncomeData = totalIncomePerMonth.find(income => income._id.month === index + 1);
  
    //   return {
    //     ...monthData,
    //     expense: totalExpenseData ? totalExpenseData.totalExpense : 0,
    //     income: totalIncomeData ? totalIncomeData.totalIncome : 0
    //   };
    // });

  // Merge the fetched total expenses per month into the initial data
  const updatedData = initialData.map((monthData, index) => {
    const totalExpenseData = totalExpensePerMonth.find(expense => 
      expense._id.month === index + 1 && expense._id.year === selectedYear
    );
    const totalIncomeData = totalIncomePerMonth.find(income => 
      income._id.month === index + 1 && income._id.year === selectedYear
    );

    return {
      ...monthData,
      expense: totalExpenseData ? totalExpenseData.totalExpense : 0,
      income: totalIncomeData ? totalIncomeData.totalIncome : 0
    };
  });

  return (
    <div className='relative w-full h-full'>

      <div className='flex items-center justify-between'>
          <p className='text-lg font-medium'>Overview</p>

          <div className='flex items-center gap-2 text-sm'>
            <p>Filter by year:</p>
            <DatePicker
              selected={new Date(selectedYear, 0)} // Set the date to January 1st of the selected year
              onChange={handleChange}
              dateFormat="yyyy"
              showYearPicker
              className=" w-20 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholderText='Filter Date:'
            />
         </div>

      </div>

      <ResponsiveContainer>
        {/* <BarChart
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
          <Bar yAxisId="left" dataKey="income" fill="#3F51B5" />
          <Bar yAxisId="left" dataKey="expense" fill="#B1B1B1" />
        </BarChart> */}

      
        <AreaChart data={updatedData}
          margin={{ top: 50, right: 30, left: 5, bottom: 40}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="expense" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>


      </ResponsiveContainer>

    </div>
  );
}

export default UserBarChart;
