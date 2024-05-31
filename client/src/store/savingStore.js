import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { baseUrl } from '../store/url.js';


const useSavingsStore = create((set) => ({

    savings: [], // state to store savings data
    totalSavings: 0,
    totalGoalAmount: 0,


    
    createSavingItem: async (savingFormData) => {
        try {
            console.log('Saving form data:', savingFormData); // Log the saving form data before making the request
    
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseUrl}/savings/createSavings`, savingFormData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            // Update the state with the new savings item
            set((state) => ({
                savings: [...state.savings, response.data.data] // Assuming response.data.data contains the new savings item
            }));
    
            toast.success('Savings created successfully');
            return response.data; // Return the response data
        } catch (error) {
            // Handle errors
            console.error('Error creating savings:', error);
            toast.error('Failed to create savings');
            throw error; // Rethrow the error for the caller to handle
        }
    },
    


    

    getSavingItemsForUser: async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/savings/getSavings`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
        // Upon successful response, update the state with the fetched savings data
        set({ savings: response.data.data }); // Assuming the response structure is { success: true, data: savingsWithTotalAmounts }
        } catch (error) {
        // Handle errors
        console.error('Error fetching savings:', error);
        
        }
    },

    getSavingItemById: async (savingsItemId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/savings/viewSavings/${savingsItemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            return response.data.data; // Assuming the response structure is { success: true, data: savingItemWithCalculations }
        } catch (error) {
            // Handle errors
            console.error('Error fetching savings item:', error);
            toast.error('Failed to fetch savings item');
            return null;
        }
    },

    addAmountItem: async (savingsItemId, formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseUrl}/savings/add-amount-item/${savingsItemId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            // Update the state with the updated savings data
            set((state) => ({
                savings: state.savings.map(savingItem => {
                    if (savingItem._id === savingsItemId) {
                        return {
                            ...savingItem,
                            amountItems: [...savingItem.amountItems, response.data.data]
                        };
                    }
                    return savingItem;
                })
            }));

            toast.success('Amount item added successfully');
            return response.data; // Return the response data
        } catch (error) {
            // Handle errors
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message) {
                // Display the error message to the user
                toast.error(error.response.data.message);
            } else {
                // Handle other errors
                console.error('Error adding amount item:', error);
                toast.error('Failed to add amount item');
            }
            throw error; // Rethrow the error for the caller to handle
        }
    },



    updateSavingsItem: async (savingsItemId, updateData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`${baseUrl}/savings/editSavings/${savingsItemId}`, updateData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (response.data && response.data.success) {
            set((state) => ({
              savings: state.savings.map(savingItem =>
                savingItem._id === savingsItemId ? { ...savingItem, ...updateData } : savingItem
              ),
            }));
            toast.success('Savings item updated successfully');
            return response.data.data;
          } else {
            toast.error('Failed to update savings item');
            return { success: false, error: 'Failed to update savings item' };
          }
        } catch (error) {
          console.error('Error updating savings item:', error);
          toast.error('Internal Server Error');
          throw error;
        }
      },
    
      deleteSavingsItem: async (savingsItemId) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.delete(`${baseUrl}/savings/deleteSavings/${savingsItemId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
    
          if (response.data && response.data.success) {
            set((state) => ({
              savings: state.savings.filter(savingItem => savingItem._id !== savingsItemId),
            }));
            toast.success('Savings item deleted successfully');
            return { success: true };
          } else {
            toast.error('Failed to delete savings item');
            return { success: false, error: 'Failed to delete savings item' };
          }
        } catch (error) {
          console.error('Error deleting savings item:', error);
          toast.error('Internal Server Error');
          throw error;
        }
      },

      getTotalSavingsForUser: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/savings/totalSavings`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (response.data && response.data.success) {
                set({ totalSavings: response.data.totalSavings });
                return response.data.totalSavings;
            } else {
                toast.error('Failed to fetch total savings');
                return { success: false, error: 'Failed to fetch total savings' };
            }
        } catch (error) {
            console.error('Error fetching total savings:', error);
            toast.error('Internal Server Error');
            throw error;
        }
    },

    getTotalGoalAmountForUser: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/savings/totalGoalAmount`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (response.data && response.data.success) {
                set({ totalGoalAmount: response.data.totalGoalAmount });
                return response.data.totalGoalAmount;
            } else {
                toast.error('Failed to fetch total goal amount');
                return { success: false, error: 'Failed to fetch total goal amount' };
            }
        } catch (error) {
            console.error('Error fetching total goal amount:', error);
            toast.error('Internal Server Error');
            throw error;
        }
    },

}));





export default useSavingsStore;

