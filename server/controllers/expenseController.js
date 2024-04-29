import ExpenseModel from '../models/Expense.js';
import asyncHandler from '../middleWare/asyncHandler.js';
import jwt from 'jsonwebtoken';

const addExpense = asyncHandler(async (req, res) => {
    // Assuming the user ID is stored in the token
    const token = req.headers.authorization; // Assuming the token is passed in the Authorization header

    // Verify and decode the token to extract the user ID
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    // Your logic to create the expense using the user ID
    const { expenseData } = req.body; // Assuming expenseData is sent in the request body

    // Create the expense with the user ID
    const newExpense = new ExpenseModel({
        ...expenseData,
        userId: userId
    });

    // Save the expense to the database
    await newExpense.save();

    // Send a response
    res.status(201).json({ success: true, data: newExpense });
});

export { addExpense };