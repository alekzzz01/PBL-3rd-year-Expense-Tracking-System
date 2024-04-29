import express from 'express';
import { addExpense } from "../controllers/expenseController.js"; 

const router = express.Router();

router.post('/addexpenses', addExpense);


router.get('/', (req, res, next ) => {
    res.send("Hello World")
   });


export { router as ExpenseRouter };
