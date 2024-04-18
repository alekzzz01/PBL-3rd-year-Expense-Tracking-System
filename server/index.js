import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user-routes.js';

dotenv.config();

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, 
  }));

  // Routes
  app.use('/auth', UserRouter);

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
