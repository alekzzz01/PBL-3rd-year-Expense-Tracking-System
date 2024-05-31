import ExpenseModel from '../models/Expense.js';
import asyncHandler from '../middleWare/asyncHandler.js';
import mongoose from "mongoose";
import Tesseract from 'tesseract.js';


const addExpense = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const userId = req.user._id;

        const { expenseType, paymentMethod, category, amount, fullName, date } = req.body;

        let expense = await ExpenseModel.findOne({ user: userId });

        if (!expense) {
            expense = new ExpenseModel({
                expenseItems: [],
                user: userId
            });
        }

        const newExpenseItem = {
            expenseType,
            paymentMethod,
            category,
            amount,
            fullName,
            date
        };

        expense.expenseItems.push(newExpenseItem);

        const savedExpense = await expense.save();
        return res.status(201).json({ success: true, data: savedExpense }); // Return response here
    } catch (error) {
        console.error("Error in addExpense:", error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' }); // Return error response here
    }
});

// Controller method to delete an expense item
const deleteExpenseItem = asyncHandler(async (req, res) => {
    try {
        const { expenseItemId } = req.params;

        const expense = await ExpenseModel.findOne({ user: req.user._id });

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense document not found' });
        }

        const index = expense.expenseItems.findIndex(item => item._id.toString() === expenseItemId);

        if (index !== -1) {
            expense.expenseItems.splice(index, 1);
            await expense.save();
            return res.status(200).json({ success: true, message: 'Expense item deleted successfully' });
        }

        return res.status(404).json({ success: false, message: 'Expense item not found' });
    } catch (error) {
        console.error("Error in deleteExpenseItem:", error);
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
                if (req.body.expenseType) expenseItem.expenseType = req.body.expenseType;
                if (req.body.paymentMethod) expenseItem.paymentMethod = req.body.paymentMethod;
                if (req.body.category) expenseItem.category = req.body.category;
                if (req.body.amount) expenseItem.amount = req.body.amount;

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

const getExpenseItemById = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Get the expense item ID from the request parameters
    const { expenseItemId } = req.params;

    try {
        // Find the user's expense document
        const expense = await ExpenseModel.findOne({ user: userId });

        // If the expense document exists
        if (expense) {
            // Find the expense item within the expense document's expenseItems array
            const expenseItem = expense.expenseItems.find(item => item._id.toString() === expenseItemId);

            // If the expense item is found, return it
            if (expenseItem) {
                return res.status(200).json({ success: true, data: expenseItem });
            } else {
                // If the expense item is not found, return an error
                return res.status(404).json({ success: false, message: 'Expense item not found' });
            }
        } else {
            // If the expense document is not found, return an error
            return res.status(404).json({ success: false, message: 'Expense document not found' });
        }
    } catch (error) {
        // If an error occurs, return an internal server error
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

const getTotalExpenses = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    try {
        // Find the income document belonging to the user
        const expenses = await ExpenseModel.findOne({ user: userId });

        if (!expenses) {
            return res.status(404).json({ success: false, message: 'Expenses not found' });
        }

      
        const totalExpenses = expenses.expenseItems.reduce((total, item) => total + item.amount, 0);

        res.status(200).json({ success: true, totalExpenses });
    } catch (error) {
        console.error("Error in get totalExpenses:", error); // Log the error
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


const scanReceipt = asyncHandler(async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { imageData } = req.body;

        console.log("Performing OCR on receipt image...");
        const { data: { text } } = await Tesseract.recognize(
            imageData,
            'eng',
            { logger: m => console.log(m) }
        );
        console.log("OCR completed. Extracted text:", text);

        //

        // const fullNameRegex = /[A-Z][a-z]*(?: [A-Z][a-z]*)+/g;
        const expenseTypeRegex = /(?:\b(?:food|grocery|restaurant|transportation|gas|fuel)\b)/gi;
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
        const paymentMethodRegex = /(?:\b(?:cash|credit card|debit card|online payment)\b)/gi;
        const categoryRegex = /(?:\b(?:groceries|dining|transportation|fuel)\b)/gi;

        const totalAmountRegex = /Total\s*price\s*(\d+(?:,\d+)?)/gi;
        const totalAmountMatches = [...text.matchAll(totalAmountRegex)];
        const totalAmount = totalAmountMatches[0][1];
 
        //

        const expenseTypeMatches = text.match(expenseTypeRegex);
        // const fullNameMatches = text.match(fullNameRegex);
        const amountMatches = text.match(totalAmount);
        const dateMatches = text.match(dateRegex);
        const paymentMethodMatches = text.match(paymentMethodRegex);
        const categoryMatches = text.match(categoryRegex);

        // 
        const expenseType = expenseTypeMatches ? expenseTypeMatches[0] : "Other";
        // const fullName = fullNameMatches ? fullNameMatches.join(" ") : "Unknown";
        const amount = amountMatches ? parseFloat(amountMatches[0].replace(/[^\d.]/g, "")) : 0;
        const date = dateMatches ? dateMatches[0] : new Date().toLocaleDateString();
        const paymentMethod = paymentMethodMatches ? paymentMethodMatches[0] : "Unknown";
        const category = categoryMatches ? categoryMatches[0] : "Other";

        const userId = req.user._id;
        const newExpense = {
            // fullName,
            expenseType,
            paymentMethod,
            category,
            amount,
            date
        };

        // Add the expense to the database using ExpenseModel
        let expense = await ExpenseModel.findOne({ user: userId });

        if (!expense) {
            expense = new ExpenseModel({
                expenseItems: [],
                user: userId
            });
        }

        const newExpenseItem = {
            expenseType: newExpense.expenseType,
            paymentMethod: newExpense.paymentMethod,
            category: newExpense.category,
            amount: newExpense.amount,
            // fullName: newExpense.fullName,
            date: newExpense.date
        };

        expense.expenseItems.push(newExpenseItem);

        const savedExpense = await expense.save();

        // Send the response after adding the expense
        res.status(200).json({ success: true, message: 'Expense added successfully', data: newExpense });
    } catch (error) {
        console.error("Error in scanning receipt:", error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
















export { addExpense, deleteExpenseItem, updateExpenseItem, getExpenseItemsForUser, getTotalExpensePerMonth, getTotalExpenses, getExpenseItemById, scanReceipt};

