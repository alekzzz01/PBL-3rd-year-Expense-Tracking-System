import express from 'express';
import { createSavings, getSavingsForUser, getTotalSavingsForUser, getTotalGoalAmountForUser, addAmountItem, editSavings, deleteSavings, getSavingsItemId } from '../controllers/savingsController.js';
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.post('/createSavings', authMiddleware, createSavings);
router.get('/getSavings', authMiddleware, getSavingsForUser);
router.get('/viewSavings/:savingsItemId', authMiddleware, getSavingsItemId)
router.post('/add-amount-item/:savingsItemId', authMiddleware, addAmountItem);
router.put('/editSavings/:savingsItemId', authMiddleware, editSavings);
router.delete('/deleteSavings/:savingsItemId', authMiddleware, deleteSavings);
router.get('/totalSavings', authMiddleware, getTotalSavingsForUser);
router.get('/totalGoalAmount', authMiddleware, getTotalGoalAmountForUser); 

export { router as SavingsRouter };