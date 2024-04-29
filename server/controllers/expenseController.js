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
    const { amount, description, expenseType, date } = req.body;

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
            amount: amount,
            description: description,
            expenseType: expenseType,
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

export { addExpense };
