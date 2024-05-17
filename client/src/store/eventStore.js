import { create } from 'zustand';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../store/url.js';


const useEventStore = create((set) => ({

    allLogs: [],


    getAllEventLogs: async () => {
        try {
          const response = await axios.get(`${baseUrl}/event/logs`);
          if (response.status === 200) {
            const logs = response.data;
            set({ allLogs: logs });
            console.log('Fetched logs:', logs);
            return { success: true, logs: logs };
          } else {
            console.error('Unexpected response status:', response.status);
            return { success: false, errorMessage: 'Failed to fetch logs' };
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
          return { success: false, errorMessage: 'Failed to fetch logs' };
        }
      },


}));


export default useEventStore;
