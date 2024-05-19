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

        let savings = await SavingsModel.findOne({ user: userId });

        // If the user doesn't have an existing expense document, create a new one
        if (!savings) {
                savings = new SavingsModel({
                    savingItems: [],
                    user: userId
                });
            }


        const newSavingsItem = {
                name: name,
                goalAmount: goalAmount,
                finishBy: finishBy,
                frequency: frequency,
                
        };

        savings.savingItems.push(newSavingsItem);
    

        const savedSaving = await savings.save();

        res.status(201).json({ success: true, data: savedSaving });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  });

  export { createSavings };