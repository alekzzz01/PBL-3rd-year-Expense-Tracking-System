import React, { useEffect, useState } from 'react';
import useIncomeStore from '../../store/incomeStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer, AreaChart, Area  } from 'recharts';



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

      <div className='flex items-center'>
        

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
    
        </AreaChart>

        </ResponsiveContainer>
    </div>
  )
}

export default UserLineChart
