import React from 'react'
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  

function userPieChart() {
  return (
    <div className='p-3 border rounded-xl'  style={{ height: 500 }}>

    <ResponsiveContainer>
      <PieChart>
        <Pie dataKey="value" data={data2} fill="#8884d8" label />
      </PieChart>
    </ResponsiveContainer>

</div>
  )
}

export default userPieChart
