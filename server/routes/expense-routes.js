import express from 'express';
import { addExpense } from "../controllers/expenseController.js"; 
import authMiddleware from '../middleWare/checkAuth.js';


const router = express.Router();

router.post('/addexpenses', authMiddleware , addExpense);


router.get('/', (req, res, next ) => {
    res.send("Hello World")
   });


export { router as ExpenseRouter };
