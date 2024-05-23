import SavingsModel from '../models/Savings.js';
import asyncHandler from '../middleWare/asyncHandler.js';

const calculateBudgetPerFrequency = (goalAmount, startDate, finishBy, frequency, totalAmountItems) => {
  const now = new Date();
  const end = new Date(finishBy);
  
  if (now >= end) {
    return 0; // If the current date is past the finishBy date, no budget per frequency needed
  }



  const remainingAmount = goalAmount - totalAmountItems;
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

    if (!name || !goalAmount || !finishBy || !frequency) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
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
  
      // Calculate total amount items for each savings item
      const savingsWithTotalAmounts = savings.savingItems.map(item => {
        // Calculate total amount for each savings item
        const totalAmountItems = item.amountItems.reduce((total, amountItem) => total + amountItem.amount, 0);
        
        // Calculate budget per frequency
        const budgetPerFrequency = calculateBudgetPerFrequency(item.goalAmount, new Date(), item.finishBy, item.frequency);
        
        return {
          ...item.toObject(), // Convert mongoose document to plain object
          totalAmountItems: totalAmountItems,
          budgetPerFrequency: budgetPerFrequency
        };
      });
  
      res.status(200).json({ success: true, data: savingsWithTotalAmounts });
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

    // Calculate total amount of existing amount items
    const totalAmountItems = savingsItem.amountItems.reduce((total, amountItem) => total + amountItem.amount, 0);

    // Ensure adding the new amount item doesn't exceed the goal amount
    if (totalAmountItems + amount > savingsItem.goalAmount) {
      return res.status(400).json({ success: false, message: 'Adding this amount would exceed the savings goal' });
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



const getSavingsItemId = asyncHandler(async (req, res) => {
  // Check if req.user exists and has the _id property
  if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // Get the user ID from the authenticated user
  const userId = req.user._id;

  // Get the expense item ID from the request parameters
  const { savingsItemId } = req.params;

  try {
      // Find the user's expense document
      const savings = await SavingsModel.findOne({ user: userId });

      // If the expense document exists
      if (savings) {
          const savingItem = savings.savingItems.find(item => item._id.toString() === savingsItemId);

          if (savingItem) {
              // Calculate total amount items for the savings item
              const totalAmountItems = savingItem.amountItems.reduce((total, amountItem) => total + amountItem.amount, 0);
              
              // Calculate budget per frequency
              const budgetPerFrequency = calculateBudgetPerFrequency(savingItem.goalAmount, new Date(), savingItem.finishBy, savingItem.frequency, totalAmountItems );
              
              // Add calculated fields to the saving item
              const savingItemWithCalculations = {
                  ...savingItem.toObject(),
                  totalAmountItems: totalAmountItems,
                  budgetPerFrequency: budgetPerFrequency
              };

              return res.status(200).json({ success: true, data: savingItemWithCalculations });
          } else {
              return res.status(404).json({ success: false, message: 'Savings item not found' });
          }
      } else {
          return res.status(404).json({ success: false, message: 'Savings document not found' });
      }
  } catch (error) {
      // If an error occurs, return an internal server error
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});





export { createSavings, getSavingsForUser, addAmountItem, editSavings, deleteSavings, getSavingsItemId };