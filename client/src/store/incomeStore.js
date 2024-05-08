import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useIncomeStore = create((set) => ({
    income: [],
    totalIncomePerMonth: [], 
    totalIncome: 0,


    addIncome: async (incomeData) => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
  
        const response = await axios.post('http://localhost:5000/income/addincome', incomeData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json' // Specify content type if needed
          }
        });
  
        if (response.status === 201) {
          set((state) => ({
            ...state,
            income: [...state.income, response.data], // Add the new expense to the expenses array
          }));
          toast.success('Income added successfully');
          return { success: true, data: response.data };
        } else {
          toast.error('Failed to add expense');
          return { success: false, error: 'Failed to add income' };
        }
      } catch (error) {
        console.error('Error adding expense:', error);
        toast.error('Internal Server Error');
        return { success: false, error: 'Internal Server Error' };
      }
    },
  



    getTotalIncomePerMonth: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/income/monthly-total-income', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
      
          // console.log('Fetched total expense per month:', response.data);
      
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
      },

      

      getTotalIncome: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/income/totalincome', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
    
          // console.log('Fetched total income:', response.data);
    
          if (response.data && response.data.success) {
            const totalIncome = response.data.totalIncome || 0; // Ensure total income is set or defaults to 0
            set((state) => ({
              ...state,
              totalIncome,
            }));
            return { success: true, totalIncome };
          } else {
            return { success: false, error: 'Failed to fetch total income' };
          }
        } catch (error) {
          console.error('Error fetching total income:', error);
          return { success: false, error: 'Failed to fetch total income' };
        }
      },

      deleteIncome: async (incomeId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/income/deleteincome/${incomeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data && response.data.success) {
                // Filter out the deleted income from the state
                set((state) => ({
                    ...state,
                    income: state.income.filter((item) => item._id !== incomeId),
                }));
                toast.success('Income deleted successfully');
                return { success: true };
            } else {
                toast.error('Failed to delete income');
                return { success: false, error: 'Failed to delete income' };
            }
        } catch (error) {
            console.error('Error deleting income:', error);
            toast.error('Internal Server Error');
            return { success: false, error: 'Internal Server Error' };
        }
    },


}));

export default useIncomeStore;

