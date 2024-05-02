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


export { addIncome  };

