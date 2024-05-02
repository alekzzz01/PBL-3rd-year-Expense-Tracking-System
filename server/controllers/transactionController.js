import ExpenseModel from '../models/Expense.js';
import IncomeModel from '../models/Income.js';
import asyncHandler from '../middleWare/asyncHandler.js';

const getAllExpensesAndIncomes = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    try {
        // Fetch expenses
        const expenses = await ExpenseModel.find({ user: userId });

        // Fetch incomes
        const incomes = await IncomeModel.find({ user: userId });

        res.status(200).json({ success: true, data: { expenses: expenses, incomes: incomes } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



export { getAllExpensesAndIncomes };
