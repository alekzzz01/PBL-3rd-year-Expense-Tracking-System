import express from 'express';
import { addIncome, deleteIncome, updateIncome, fetchIncome, getTotalIncomePerMonth } from "../controllers/incomeController.js"; 
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.post('/addincome', authMiddleware, addIncome);
router.delete('/deleteincome/:incomeId', authMiddleware, deleteIncome);
router.put('/updateincome/:incomeId', authMiddleware, updateIncome); 
router.get('/fetchincome', authMiddleware, fetchIncome); // Define route for fetching/displaying all income
router.get('/monthly-total-income', authMiddleware, getTotalIncomePerMonth)

router.get('/', (req, res, next) => {
    res.send("Hello World");
});

export { router as IncomeRouter };