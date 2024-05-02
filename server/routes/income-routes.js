import express from 'express';
import { addIncome  } from "../controllers/incomeController.js"; 
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.post('/addincome', authMiddleware , addIncome);

router.get('/', (req, res, next ) => {
    res.send("Hello World")
});

export { router as IncomeRouter };

