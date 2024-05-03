import IncomeModel from '../models/Income.js';
import asyncHandler from '../middleWare/asyncHandler.js';


const addIncome = asyncHandler(async (req, res) => {
    // Check if req.user exists and has the _id property
    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Extract necessary fields from the request body
    const {incomeType, paymentMethod, category, amount, fullName, date  } = req.body;

    try {
     
        let income = await IncomeModel.findOne({ user: userId });

        if (!income) {
            income = new IncomeModel({
                incomeItems: [],
                user: userId
            });
        }

        const newIncomeItem = {
            incomeType: incomeType,
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
        const income = await ExpenseModel.aggregate([
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



export { addIncome, getTotalIncomePerMonth  };

