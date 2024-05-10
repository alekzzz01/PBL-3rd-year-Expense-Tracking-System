import React, { useEffect, useState } from 'react';
import useIncomeStore from '../../store/incomeStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer  } from 'recharts';



function UserLineChart() {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State variable to store the selected year

  const handleChange = (date) => {
    setSelectedYear(date.getFullYear()); // Update the selected year when the user changes it in the date picker
  };


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

        const totalIncomeData = totalIncomePerMonth.find(income => 
          income._id.month === index + 1 && income._id.year === selectedYear
        );
    
        return {
          ...monthData,
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
    
        <LineChart width={1000}  data={updatedData}
        margin={{ top: 50, right: 30, left: 5, bottom: 40}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" />
      
        </LineChart>

        </ResponsiveContainer>
    </div>
  )
}

export default UserLineChart
