import { create } from 'zustand';
// import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const useExpenseStore = create((set) => ({

    expenses: [],

    addExpense: async (expenseData) => {
      try {
        const response = await axios.post('http://localhost:5000/expense/addexpenses', expenseData);
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