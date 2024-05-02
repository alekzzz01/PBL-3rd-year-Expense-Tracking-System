import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
   
    income: 2400,
    expense: 2800,
   
  },
  {
    name: 'Feb',

    income: 1398,
    expense: 2800,
  
  },
  {
    name: 'Mar',

    income: 9800,
    expense: 2800,

  },
  {
    name: 'Apr',

    income: 3908,
    expense: 2800,

  },
  {
    name: 'May',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Jun',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Jul',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Aug',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Sep',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Oct',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Nov',
  
    income: 4800,
    expense: 2800,

  },

  {
    name: 'Dec',
  
    income: 4800,
    expense: 2800,

  },

];


function userBarChart() {
  return (

    <>
    <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#82ca9d' }} />
          <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend  />
          <Bar yAxisId="left" dataKey="income" fill="#8884d8" />
          <Bar yAxisId="left" dataKey="expense" fill="#82ca9d" />
      
        </BarChart>
      </ResponsiveContainer>
  </>

  )
}

export default userBarChart
