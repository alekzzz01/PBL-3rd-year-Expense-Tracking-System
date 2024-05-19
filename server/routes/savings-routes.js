import express from 'express';
import { createSavings } from '../controllers/savingsController.js';
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

// Route to create a new saving
router.post('/createSavings', authMiddleware, createSavings);

// Additional routes (if needed) can go here

export { router as SavingsRouter };