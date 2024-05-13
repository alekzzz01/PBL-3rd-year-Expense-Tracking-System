import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { baseUrl } from '../store/url.js';

const useExpenseStore = create((set) => ({
  expenses: [],
  totalExpensePerMonth: [], 
  totalExpenses: 0,

  addExpense: async (expenseData) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      const response = await axios.post(`${baseUrl}/expense/addexpenses`, expenseData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json' // Specify content type if needed
        }
      });

      if (response.status === 201) {
        set((state) => ({
          ...state,
          expenses: [...state.expenses, response.data], // Add the new expense to the expenses array
        }));
        toast.success('Expense added successfully');
        return { success: true, data: response.data };
      } else {
        toast.error('Failed to add expense');
        return { success: false, error: 'Failed to add expense' };
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Internal Server Error');
      return { success: false, error: 'Internal Server Error' };
    }
  },

  getExpenseItemsForUser: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/expense/expenseitems`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('Fetched expense items:', response.data);

      if (response.data && response.data.success) {
        const expensesData = response.data.data || []; // Ensure data is an array
        const mappedExpenses = expensesData.map((expense) => ({
          expenseType: expense.expenseType,
          paymentMethod: expense.paymentMethod,
          category: expense.category,
          amount: expense.amount,
          fullName: expense.fullName,
          date: new Date(expense.date).toLocaleDateString(),
          _id: expense._id,
        }));
        console.log('Mapped expenses:', mappedExpenses); 

        return { success: true, data: mappedExpenses };
      } else {
        return { success: false, error: 'Failed to fetch expense items' };
      }
    } catch (error) {
      console.error('Error fetching expense items:', error);
      return { success: false, error: 'Failed to fetch expense items' };
    }
  },

  getTotalExpensePerMonth: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/expense/monthly-total`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log('Fetched total expense per month:', response.data);

      if (response.data && response.data.success) {
        const totalExpensePerMonthData = response.data.data || []; // Ensure data is an array
        set((state) => ({
          ...state,
          totalExpensePerMonth: totalExpensePerMonthData,
        }));
        return { success: true, data: totalExpensePerMonthData };
      } else {
        return { success: false, error: 'Failed to fetch total expense per month' };
      }
    } catch (error) {
      console.error('Error fetching total expense per month:', error);
      return { success: false, error: 'Failed to fetch total expense per month' };
    }
  },

  
  getTotalExpenses: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/expense/totalExpenses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log('Fetched total expense:', response.data);

      if (response.data && response.data.success) {
        const totalExpenses = response.data.totalExpenses || 0;
        set((state) => ({
          ...state,
          totalExpenses,
        }));
        return { success: true, totalExpenses };
      } else {
        return { success: false, error: 'Failed to fetch total expenses' };
      }
    } catch (error) {
      console.error('Error fetching total expenses:', error);
      return { success: false, error: 'Failed to fetch total expenses' };
    }
  },

  deleteExpense: async (expenseItemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${baseUrl}/expense/deleteexpenses/${expenseItemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data && response.data.success) {
        set((state) => ({
          ...state,
          expenses: state.expenses.filter((item) => item._id !== expenseItemId), // Corrected from expenses to expense
        }));
        toast.success('Expense deleted successfully');
        return { success: true };
      } else {
        toast.error('Failed to delete expense');
        return { success: false, error: 'Failed to delete expense' };
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Internal Server Error');
      return { success: false, error: 'Internal Server Error' };
    }
  },  








}));





export default useExpenseStore;



