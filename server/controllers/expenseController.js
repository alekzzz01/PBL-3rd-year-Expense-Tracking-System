import ExpenseModel from '../models/Expense.js';
import asyncHandler from '../middleWare/asyncHandler.js';


const addExpense = asyncHandler(async (req, res) => {

    console.log("User:", req.user);
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Extract necessary information from the request body or parameters
    const { amount, description, expenseType, date } = req.body;

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    try {
        // Create a new expense document
        const newExpense = new ExpenseModel({
            amount,
            description,
            expenseType,
            date,
            user: userId
        });

        // Save the new expense document to the database
        await newExpense.save();

        // Send a success response
        res.status(201).json({ success: true, data: newExpense });
    } catch (error) {
        // If an error occurs during the process, send an error response
        res.status(500).json({ success: false, error: error.message });
    }
});

export { addExpense };
