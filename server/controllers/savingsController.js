import SavingsModel from '../models/Savings.js';
import asyncHandler from '../middleWare/asyncHandler.js';

const calculateBudgetPerFrequency = (goalAmount, startDate, finishBy, frequency) => {
  const now = new Date();
  const end = new Date(finishBy);
  
  if (now >= end) {
    return 0; // If the current date is past the finishBy date, no budget per frequency needed
  }

  const remainingAmount = goalAmount;
  const remainingTime = (end - now) / (1000 * 60 * 60 * 24); // Convert remaining time to days

  let periods;
  switch (frequency) {
    case 'daily':
      periods = remainingTime; // Number of days remaining
      break;
    case 'weekly':
      periods = remainingTime / 7; // Number of weeks remaining
      break;
    case 'monthly':
      periods = remainingTime / 30; // Approximate number of months remaining
      break;
    default:
      periods = 0;
  }

  return remainingAmount / periods;
};


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

  
// Get savings items for user
const getSavingsForUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const userId = req.user._id;

  try {
    const savings = await SavingsModel.findOne({ user: userId });

    if (!savings) {
      return res.status(404).json({ success: false, message: 'Savings document not found' });
    }

    const savingsWithBudgets = savings.savingItems.map(item => {
      const budgetPerFrequency = calculateBudgetPerFrequency(item.goalAmount, new Date(), item.finishBy, item.frequency);
      return {
        ...item.toObject(), // Convert mongoose document to plain object
        budgetPerFrequency: budgetPerFrequency
      };
    });

    res.status(200).json({ success: true, data: savingsWithBudgets });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const addAmountItem = asyncHandler(async (req, res) => {
  const { amount, date, note } = req.body;
  const { savingsItemId } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // Validate required fields
  if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
  }

  // Get the user ID from the authenticated user
  const userId = req.user._id;

  try {
      // Find the user's savings document
      let savings = await SavingsModel.findOne({ user: userId });

      if (!savings) {
          return res.status(404).json({ success: false, message: 'Savings document not found' });
      }

      // Find the specific savings item within the savings document
      const savingsItem = savings.savingItems.id(savingsItemId);

      if (!savingsItem) {
          return res.status(404).json({ success: false, message: 'Savings item not found' });
      }

      // Create a new amount item
      const newAmountItem = {
          amount: amount,
          date: date || Date.now(),
          note: note
      };

      // Add the new amount item to the savings item's amountItems array
      savingsItem.amountItems.push(newAmountItem);

      // Save the updated savings document
      const updatedSavings = await savings.save();

      res.status(201).json({ success: true, data: updatedSavings });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
});

// Edit a savings item
const editSavings = asyncHandler(async (req, res) => {
  const { savingsItemId } = req.params;
  const { name, goalAmount, finishBy, frequency } = req.body;

  if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const userId = req.user._id;

  try {
      let savings = await SavingsModel.findOne({ user: userId });

      if (!savings) {
          return res.status(404).json({ success: false, message: 'Savings document not found' });
      }

      const savingsItem = savings.savingItems.id(savingsItemId);

      if (!savingsItem) {
          return res.status(404).json({ success: false, message: 'Savings item not found' });
      }

      if (name) savingsItem.name = name;
      if (goalAmount) savingsItem.goalAmount = goalAmount;
      if (finishBy) savingsItem.finishBy = finishBy;
      if (frequency) savingsItem.frequency = frequency;

      const updatedSavings = await savings.save();

      res.status(200).json({ success: true, data: updatedSavings });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
});

// Delete a savings item
// Delete a savings item
const deleteSavings = asyncHandler(async (req, res) => {
  const { savingsItemId } = req.params;

  if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const userId = req.user._id;

  try {
      let savings = await SavingsModel.findOne({ user: userId });

      if (!savings) {
          return res.status(404).json({ success: false, message: 'Savings document not found' });
      }

      const savingsItem = savings.savingItems.id(savingsItemId);

      if (!savingsItem) {
          return res.status(404).json({ success: false, message: 'Savings item not found' });
      }

      // Remove the savings item
      savings.savingItems.pull(savingsItemId);

      const updatedSavings = await savings.save();

      res.status(200).json({ success: true, data: updatedSavings });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
});


export { createSavings, getSavingsForUser, addAmountItem, editSavings, deleteSavings };