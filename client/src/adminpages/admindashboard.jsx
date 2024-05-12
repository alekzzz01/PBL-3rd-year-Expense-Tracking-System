import React, {useEffect, useState} from 'react'
import AdminChart from '../admincomponents/charts/adminAreaChart'
import useAuthStore from '../store/authStore';
import { ArrowUp, ArrowDown } from 'lucide-react';



function Admindashboard() {

  const { totalRegisteredUsers, getTotalRegisteredUsers } = useAuthStore();
  const { totalActiveUsers, getTotalActiveUsers}  = useAuthStore();
  const { totalNewUsers ,getTotalNewUsers} = useAuthStore();

  const [currentMonthRegistered, setCurrentMonthRegistered] = useState(0);
  const [lastMonthRegistered, setLastMonthRegistered] = useState(0);
  const [percentChange, setPercentChange] = useState(0);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    getTotalRegisteredUsers(); // Fetch total registered users
  }, [getTotalRegisteredUsers]);

  const { totalUserPerMonth, getTotalRegisteredUsersPerMonth } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTotalRegisteredUsersPerMonth();
        await getTotalActiveUsers();
        await getTotalNewUsers();
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchData();
  }, [getTotalRegisteredUsersPerMonth, getTotalActiveUsers, getTotalNewUsers]);


  // compare current users registered per month to last month users registered

  useEffect(() => {
    const currentMonthData = totalUserPerMonth.find(user =>
      user._id.month === new Date().getMonth() + 1
    );
    setCurrentMonthRegistered(currentMonthData ? currentMonthData.totalUsers : 0);

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthData = totalUserPerMonth.find(user =>
      user._id.month === lastMonth.getMonth() + 1
    );
    setLastMonthRegistered(lastMonthData ? lastMonthData.totalUsers : 0);
  }, [totalUserPerMonth]);

  useEffect(() => {
    if (lastMonthRegistered !== 0) {
      const change = ((currentMonthRegistered - lastMonthRegistered) / lastMonthRegistered) * 100;
      setPercentChange(change);
    } else {
      setPercentChange(0);
    }
  }, [currentMonthRegistered, lastMonthRegistered]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const percentChangeStyle = percentChange > 0 ? 'text-green-500 bg-green-100' : percentChange < 0 ? 'text-red-500' : '';


  return (
    <div className='p-9 w-full'>

        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5'>

              <div className='py-5 px-6 border border-base-300 rounded-md flex flex-wrap justify-between items-center'>
                      <div className='flex flex-col gap-4'>
                        <p className='font-bold tracking-wide drop-shadow-md'>TOTAL REGISTERED</p>
                        <p className='text-4xl font-extrabold'>{totalRegisteredUsers}</p>
                      </div>

                      <div className={`text-md drop-shadow-sm px-3 py-1 rounded-2xl flex items-center gap-1 ${percentChangeStyle}`}>
                        <p>{percentChange > 0 ? <ArrowUp /> : percentChange < 0 ? <ArrowDown /> : null}</p>
                        <p>{percentChange} %</p>
                      </div>
              </div>

              <div className='py-5 px-6 border border-base-300 rounded-md flex flex-wrap justify-between items-center'>
                      <div className='flex flex-col gap-4'>
                        <p className='font-bold tracking-wide drop-shadow-md'>ACTIVE USERS</p>
                        <p className='text-4xl font-extrabold'>{totalActiveUsers}</p>
                      </div>

                      
              </div>

              <div className='py-5 px-6 border border-base-300 rounded-md flex flex-wrap justify-between items-center'>
                      <div className='flex flex-col gap-4'>
                        <p className='font-bold tracking-wide drop-shadow-md'>NEW USERS</p>
                        <p className='text-4xl font-extrabold'>{totalNewUsers}</p>
                      </div>

                    
              </div>

              <div className='py-5 px-6 border border-base-300 rounded-md flex flex-wrap justify-between items-center'>
                      <div className='flex flex-col gap-4'>
                        <p className='font-bold tracking-wide drop-shadow-md'>EVENTS</p>
                        <p className='text-4xl font-extrabold'>3</p>
                      </div>

              </div>


              <div className='py-5 px-6 border border-base-300 rounded-md col-span-1 md:col-span-1 lg:col-span-4' style={{ height: 700 }}>
                <AdminChart/>
              </div>


        </div>
          
    </div>
  )
}

export default Admindashboard
