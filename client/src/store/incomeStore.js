import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useIncomeStore = create((set) => ({
    expenses: [],
    totalIncomePerMonth: [], 



    getTotalIncomePerMonth: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/income/monthly-total-income', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
      
          console.log('Fetched total expense per month:', response.data);
      
          if (response.data && response.data.success) {
            const totalIncomePerMonthData = response.data.data || []; // Ensure data is an array
            set((state) => ({
              ...state,
              totalIncomePerMonth: totalIncomePerMonthData,
            }));
            return { success: true, data: totalIncomePerMonthData };
          } else {
            return { success: false, error: 'Failed to fetch total income per month' };
          }
        } catch (error) {
          console.error('Error fetching total income per month:', error);
          return { success: false, error: 'Failed to fetch total income per month' };
        }
      }


}));

export default useIncomeStore;

