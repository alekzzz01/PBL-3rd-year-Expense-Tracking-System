import express from 'express';
import { addExpense, deleteExpenseItem, updateExpenseItem } from "../controllers/expenseController.js"; 
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.post('/addexpenses', authMiddleware , addExpense);
router.delete('/deleteexpenses/:expenseItemId', authMiddleware, deleteExpenseItem); // Route for deleting an expense item
router.put('/updateexpenses/:expenseItemId', authMiddleware, updateExpenseItem); // Route for updating an expense item
router.get('/fetchexpenses/:expenseType', authMiddleware, getExpensesByType);

router.get('/', (req, res, next ) => {
    res.send("Hello World")
});

export { router as ExpenseRouter };

