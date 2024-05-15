import IncomeModel from '../models/Income.js';
import asyncHandler from '../middleWare/asyncHandler.js';
import mongoose from "mongoose";


const addIncome = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Extract necessary fields from the request body
    const { paymentMethod, category, amount, fullName, date  } = req.body;

    try {
     
        let income = await IncomeModel.findOne({ user: userId });

        if (!income) {
            income = new IncomeModel({
                incomeItems: [],
                user: userId
            });
        }

        const newIncomeItem = {
         
            paymentMethod: paymentMethod,
            category: category,
            amount: amount,
            fullName: fullName,
            date: date,
            
        };

        income.incomeItems.push(newIncomeItem);

        const savedIncome = await income.save();
        res.status(201).json({ success: true, data: savedIncome });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Function to delete an income item
const deleteIncome = asyncHandler(async (req, res) => {
    const incomeId = req.params.incomeId;

    try {
        const userId = req.user._id;

        // Find the income document belonging to the user
        let income = await IncomeModel.findOne({ user: userId });

        if (!income) {
            return res.status(404).json({ success: false, message: 'Income not found' });
        }

        // Find the index of the income item to be deleted
        const index = income.incomeItems.findIndex(item => item._id.toString() === incomeId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Income item not found' });
        }

        // Remove the income item from the array
        income.incomeItems.splice(index, 1);

        // Save the updated income document
        const savedIncome = await income.save();
        res.status(200).json({ success: true, message: 'Income deleted successfully', data: savedIncome });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// Function to update an income item
const updateIncome = asyncHandler(async (req, res) => {
    const incomeId = req.params.incomeId;

    try {
        const userId = req.user._id;

        // Find the income document belonging to the user
        let income = await IncomeModel.findOne({ user: userId });

        if (!income) {
            return res.status(404).json({ success: false, message: 'Income not found' });
        }

        // Find the index of the income item to be updated
        const index = income.incomeItems.findIndex(item => item._id.toString() === incomeId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Income item not found' });
        }

        // Extract necessary fields from the request body
        const { incomeType, paymentMethod, category, amount, fullName, date } = req.body;

        // Update the income item
        income.incomeItems[index] = {
            incomeType: incomeType || income.incomeItems[index].incomeType,
            paymentMethod: paymentMethod || income.incomeItems[index].paymentMethod,
            category: category || income.incomeItems[index].category,
            amount: amount || income.incomeItems[index].amount,
            fullName: fullName || income.incomeItems[index].fullName,
            date: date || income.incomeItems[index].date,
        };

        // Save the updated income document
        const savedIncome = await income.save();
        res.status(200).json({ success: true, message: 'Income updated successfully', data: savedIncome });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Function to fetch/display all income
const fetchIncome = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the income document belonging to the user
        const income = await IncomeModel.findOne({ user: userId });

        if (!income) {
            return res.status(404).json({ success: false, message: 'Income not found' });
        }

        res.status(200).json({ success: true, data: income });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


const getTotalIncomePerMonth = asyncHandler(async (req, res) => {
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
        const income = await IncomeModel.aggregate([
            // Match expenses for the user
            { $match: { user: userObjectId } },

            // Unwind expense items array to access individual items
            { $unwind: "$incomeItems" },

            // Project month and year from the expense items
            {
                $project: {
                    month: '$incomeItems.month',
                    year: '$incomeItems.year',
                    amount: '$incomeItems.amount'
                }
            },

            // Group by month and year, calculate total amount for each month
            {
                $group: {
                    _id: { month: '$month', year: '$year' },
                    totalIncome: { $sum: '$amount' }
                }
            },

            // Sort by year and month
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Return the result
        res.status(200).json({ success: true, data: income });
    } catch (error) {
        console.error("Error in getTotalIncomePerMonth:", error); // Log the error
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


const getTotalIncome = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    try {
        // Find the income document belonging to the user
        const income = await IncomeModel.findOne({ user: userId });

        if (!income) {
            return res.status(404).json({ success: false, message: 'Income not found' });
        }

        // Calculate total income
        const totalIncome = income.incomeItems.reduce((total, item) => total + item.amount, 0);

        // Return the total income
        res.status(200).json({ success: true, totalIncome });
    } catch (error) {
        console.error("Error in getTotalIncome:", error); // Log the error
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



export { addIncome, deleteIncome, updateIncome, fetchIncome, getTotalIncomePerMonth, getTotalIncome };





