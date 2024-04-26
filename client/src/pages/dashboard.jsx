import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    hv: 2800,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    hv: 2800,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    hv: 2800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    hv: 2800,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    hv: 2800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    hv: 2800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    hv: 2800,
    amt: 2100,
  },
];


const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];


function dashboard() {
  return (
    <>

    <div className='p-5 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

              <div className='p-3 border rounded-xl col-span-1 md:col-span-2 lg:col-span-2' style={{ height: 500 }}>
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
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                        <Bar yAxisId="left" dataKey="hv" fill="#964B00" />
                        <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='p-3 border rounded-xl'  style={{ height: 500 }}>

                    <ResponsiveContainer>
                      <PieChart>
                        <Pie dataKey="value" data={data2} fill="#8884d8" label />
                      </PieChart>
                    </ResponsiveContainer>

                </div>

                <div className='p-3 border rounded-xl w-full  '>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                </div>


            </div>
           
    </div>

    </>
  )
}

export default dashboard
