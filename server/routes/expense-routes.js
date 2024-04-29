import express from 'express';
import { addExpense } from "../controllers/expenseController.js"; 

const router = express.Router();
router.post('/addexpenses', addExpense);


export default router;

export { router as ExpenseRouter };
