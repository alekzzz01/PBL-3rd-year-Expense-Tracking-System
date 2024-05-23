import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { baseUrl } from '../store/url.js';


const useSavingsStore = create((set) => ({

    savings: [], // state to store savings data


    
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

}));





export default useSavingsStore;

