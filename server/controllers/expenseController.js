import ExpenseModel from '../models/Expense.js';
import asyncHandler from '../middleWare/asyncHandler.js';

const addExpense = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Extract necessary fields from the request body
    const {expenseType, paymentMethod, category, amount, fullName  } = req.body;

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
            date: date || new Date() // Use provided date or current date if not provided
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
            const deleted = await expense.deleteExpenseItem(expenseItemId);
            if (deleted) {
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

export { addExpense, deleteExpenseItem, updateExpenseItem };

