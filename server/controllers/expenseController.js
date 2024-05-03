import ExpenseModel from '../models/Expense.js';
import asyncHandler from '../middleWare/asyncHandler.js';
import mongoose from "mongoose";


const addExpense = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Extract necessary fields from the request body
    const {expenseType, paymentMethod, category, amount, fullName, date  } = req.body;

    try {
        // Find the user's expense document
        let expense = await ExpenseModel.findOne({ user: userId });

        // If the user doesn't have an existing expense document, create a new one
        if (!expense) {
            expense = new ExpenseModel({
                expenseItems: [],
                user: userId
            });
        }

        // Create a new expense item and push it to the expense document's expenseItems array
        const newExpenseItem = {
            expenseType: expenseType,
            paymentMethod: paymentMethod,
            category: category,
            amount: amount,
            fullName: fullName,
            date: date,
            // date: date || new Date() // Use provided date or current date if not provided
        };

        expense.expenseItems.push(newExpenseItem);

        // Save the updated expense document
        const savedExpense = await expense.save();
        res.status(201).json({ success: true, data: savedExpense });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Controller method to delete an expense item
const deleteExpenseItem = asyncHandler(async (req, res) => {
    const { expenseItemId } = req.params; // Get the expense item ID from request parameters

    try {
        // Find the user's expense document
        const expense = await ExpenseModel.findOne({ user: req.user._id });

        // If the expense document exists, attempt to delete the expense item
        if (expense) {
            // Find the index of the expense item with the given ID
            const index = expense.expenseItems.findIndex(item => item._id.toString() === expenseItemId);

            // If the expense item exists, remove it from the array
            if (index !== -1) {
                expense.expenseItems.splice(index, 1);
                await expense.save(); // Save the updated expense document
                return res.status(200).json({ success: true, message: 'Expense item deleted successfully' });
            }
        }
        // If expense document or expense item not found, return error
        return res.status(404).json({ success: false, message: 'Expense item not found' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Controller method to update an expense item
const updateExpenseItem = asyncHandler(async (req, res) => {
    const { expenseItemId } = req.params; // Get the expense item ID from request parameters

    try {
        // Find the user's expense document
        const expense = await ExpenseModel.findOne({ user: req.user._id });

        // If the expense document exists, find and update the expense item
        if (expense) {
            const expenseItem = expense.expenseItems.id(expenseItemId);

            if (expenseItem) {
                // Update the expense item fields if provided in the request body
                if (req.body.amount) expenseItem.amount = req.body.amount;
                if (req.body.description) expenseItem.description = req.body.description;
                if (req.body.expenseType) expenseItem.expenseType = req.body.expenseType;
                if (req.body.date) expenseItem.date = req.body.date;

                // Save the updated expense document
                await expense.save();
                return res.status(200).json({ success: true, message: 'Expense item updated successfully', data: expenseItem });
            }
            // If expense item not found, return error
            return res.status(404).json({ success: false, message: 'Expense item not found' });
        }
        // If expense document not found, return error
        return res.status(404).json({ success: false, message: 'Expense document not found' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

    
});

// Controller method to fetch expenses by expense type
const getExpenseItemsForUser = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    try {
        // Find the user's expense document
        const expense = await ExpenseModel.findOne({ user: userId });

        // If the expense document exists, return all expense items
        if (expense) {
            return res.status(200).json({ success: true, data: expense.expenseItems });
        }

        // If expense document not found, return error
        return res.status(404).json({ success: false, message: 'Expense document not found' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


const getTotalExpensePerMonth = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    // Construct userObjectId from userId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    try {
        // Aggregate expenses for the user
        const expenses = await ExpenseModel.aggregate([
            // Match expenses for the user
            { $match: { user: userObjectId } },

            // Unwind expense items array to access individual items
            { $unwind: "$expenseItems" },

            // Project month and year from the expense items
            {
                $project: {
                    month: '$expenseItems.month',
                    year: '$expenseItems.year',
                    amount: '$expenseItems.amount'
                }
            },

            // Group by month and year, calculate total amount for each month
            {
                $group: {
                    _id: { month: '$month', year: '$year' },
                    totalExpense: { $sum: '$amount' }
                }
            },

            // Sort by year and month
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Return the result
        res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        console.error("Error in getTotalExpensePerMonth:", error); // Log the error
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});






export { addExpense, deleteExpenseItem, updateExpenseItem, getExpenseItemsForUser, getTotalExpensePerMonth};

