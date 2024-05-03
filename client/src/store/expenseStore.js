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

getExpenseItemsForUser: async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/expense/expenseitems', {
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






}));





export default useExpenseStore;



