import {Logs} from '../models/Logs.js';
import asyncHandler from '../middleWare/asyncHandler.js';
import { getClientIp } from '../utils/getIpinfo.js';

// Controller function to get all logs
const getAllLogs = asyncHandler(async (req, res) => {
  try {
    const logs = await Logs.find(); // Retrieve all logs from the database
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const removeEvent = async (req, res) => {


  try {
      const eventId = req.params.eventId; // Extract userId from request parameters
      console.log("Removing event with ID:", eventId); // Log the userId to verify it
     
      const result = await Logs.findByIdAndDelete(eventId); // Assuming you're using Mongoose
      console.log("Removal result:", result); // Log the result of the removal operation
      if (!result) {
          return res.status(404).json({ success: false, message: 'Event not found' });
      }
      console.log("Event removed successfully");

    
      res.status(200).json({ success: true, message: 'Event removed successfully' });
  } catch (error) {
      console.error('Error removing Event:', error);
    
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export {  getAllLogs, removeEvent };