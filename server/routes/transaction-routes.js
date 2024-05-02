import express from 'express';
import { getAllExpensesAndIncomes } from "../controllers/transactionController.js"; 
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.get('/combinedtable', authMiddleware , getAllExpensesAndIncomes);


router.get('/', (req, res, next ) => {
    res.send("Hello World")
});

export { router as TransactionRouter };

