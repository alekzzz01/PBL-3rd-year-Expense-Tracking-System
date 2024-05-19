import express from 'express';
import { createSavings, getSavingsForUser, addAmountItem, editSavings, deleteSavings } from '../controllers/savingsController.js';
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.post('/createSavings', authMiddleware, createSavings);
router.get('/getSavings', authMiddleware, getSavingsForUser);
router.post('/add-amount-item/:savingsItemId', authMiddleware, addAmountItem);
router.put('/editSavings/:savingsItemId', authMiddleware, editSavings);
router.delete('/deleteSavings/:savingsItemId', authMiddleware, deleteSavings);
// Additional routes (if needed) can go here

export { router as SavingsRouter };