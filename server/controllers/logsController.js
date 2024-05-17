import {Logs} from '../models/Logs.js';
import asyncHandler from '../middleWare/asyncHandler.js';

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



export {getAllLogs };