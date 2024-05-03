import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  const month = months[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedDate = `${month} ${day}, ${year} | ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  return formattedDate;
};

const useTransactionStore = create((set) => ({

  transactions: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
  
  fetchTransactions: async () => {
    set({ isLoading: true, isError: false }); // Set loading state
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/transaction/combinedtable', {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json' // Specify content type if needed
        }
      });
  
      // Combine expenses and incomes into a single array of items
      const transactions = response.data.data.expenses.flatMap(expense => {
        return expense.expenseItems.map(expenseItem => ({
          tableType: expenseItem.tabletype,
          category: expenseItem.category,
          paymentMethod: expenseItem.paymentMethod,
          amount: expenseItem.amount,
          date: formatDate(expenseItem.date)
        }));
      }).concat(response.data.data.incomes.flatMap(income => {
        return income.incomeItems.map(incomeItem => ({
          tableType: incomeItem.tabletype,
          category: incomeItem.category,
          paymentMethod: incomeItem.paymentMethod,
          amount: incomeItem.amount,
          date: formatDate(incomeItem.date)
        }));
      }));
  
      console.log('Combined Transactions:', transactions);
  
      // Update the store's state with the combined transactions
      set({ transactions: transactions, isLoading: false });
    } catch (error) {
      // Handle error
      console.error('Error fetching transactions:', error);
      set({ isLoading: false, isError: true, errorMessage: 'Error fetching transactions' });
  
      // Show error toast
      toast.error('Error fetching transactions. Please try again later.');
    }
  },
  


}));

export default useTransactionStore;
