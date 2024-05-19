import SavingsModel from '../models/Savings.js';
import asyncHandler from '../middleWare/asyncHandler.js';


// Create a new saving
const createSavings = asyncHandler(async (req, res) => {
    const { name, goalAmount, finishBy, frequency } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // Get the user ID from the authenticated user
  const userId = req.user._id;
    try {
    

        const newSaving = new SavingsModel({
            name,
            goalAmount,
            finishBy,
            frequency,
            user: userId
        });

        const savedSaving = await newSaving.save();

        res.status(201).json(savedSaving);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  });

  export { createSavings };