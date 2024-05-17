import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user-routes.js';
import { ExpenseRouter } from './routes/expense-routes.js';
import { TransactionRouter } from './routes/transaction-routes.js';
import { IncomeRouter } from './routes/income-routes.js';
import { LogsRouter } from './routes/log-routes.js';

// import ExpenseModel from './models/Expense.js' // for inserting expense
// import expenseData from './data/UserExpense.js'; // for inserting expense

dotenv.config();

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    // origin: 'https://expense-client.vercel.app',
    credentials: true, 
  }));


  // Routes
  app.use('/auth', UserRouter);
  app.use('/expense', ExpenseRouter);
  app.use('/income', IncomeRouter);
  app.use('/transaction', TransactionRouter);
  app.use('/event', LogsRouter);




  // Database connection
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


  
// for inserting expense
  // try {
  //   await ExpenseModel.deleteMany(); // Remove existing data
  //   await ExpenseModel.insertMany(expenseData); // Insert mock data
  //   console.log('Mock data inserted successfully');
  // } catch (error) {
  //   console.error('Error inserting mock data:', error);
  // }

