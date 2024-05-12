import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer, AreaChart, Area } from 'recharts';

function UserBarChart() {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State variable to store the selected year
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleChange = (date) => {
    setSelectedYear(date.getFullYear()); // Update the selected year when the user changes it in the date picker
  };

  const { totalUserPerMonth, getTotalRegisteredUsersPerMonth } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTotalRegisteredUsersPerMonth();
     
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [getTotalRegisteredUsersPerMonth]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Define the initial data with placeholders
  const initialData = [
    { name: 'Jan', registered: 0 },
    { name: 'Feb', registered: 0 },
    { name: 'Mar', registered: 0},
    { name: 'Apr', registered: 0 },
    { name: 'May', registered: 0 },
    { name: 'Jun', registered: 0 },
    { name: 'Jul', registered: 0 },
    { name: 'Aug', registered: 0 },
    { name: 'Sep', registered: 0 },
    { name: 'Oct', registered: 0 },
    { name: 'Nov', registered: 0 },
    { name: 'Dec', registered: 0 }
  ];

  

  const updatedData = initialData.map((monthData, index) => {
    const totalUserData = totalUserPerMonth.find(user => 
      user._id.month === index + 1 && user._id.year === selectedYear
    );

    return {
      ...monthData,
      registered: totalUserData ? totalUserData.totalUsers : 0,
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
          <Area type="monotone" dataKey="registered" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      
        </AreaChart>


      </ResponsiveContainer>

    </div>
  );
}

export default UserBarChart;
