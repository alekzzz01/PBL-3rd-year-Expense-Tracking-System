import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useExpenseStore = create((set) => ({
  expenses: [],

  addExpense: async (expenseData) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/expense/addexpenses', expenseData, {
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
}));

export default useExpenseStore;
