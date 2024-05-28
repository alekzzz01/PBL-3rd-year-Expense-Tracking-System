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
import { SavingsRouter } from './routes/savings-routes.js';

import { backupDatabase } from './scripts/backup.js';
import { backupDailyDatabase, cancelDailyBackup } from './scripts/backupScheduler.js';
import { MongoClient } from 'mongodb';
import archiver from 'archiver';
import { ObjectId } from 'mongodb';


// import ExpenseModel from './models/Expense.js' // for inserting expense
// import expenseData from './data/UserExpense.js'; // for inserting expense

  dotenv.config();

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
   origin: 'http://localhost:3000', // Allow requests from this origin
  //  origin: 'https://expense-client.vercel.app',
    credentials: true, 
  }));


  // Routes
  app.use('/auth', UserRouter);
  app.use('/expense', ExpenseRouter);
  app.use('/income', IncomeRouter);
  app.use('/transaction', TransactionRouter);
  app.use('/event', LogsRouter);
  app.use('/savings', SavingsRouter);


  // backup 

  app.post('/backup', async (req, res) => {
    try {
        const backupResult = await backupDatabase();
        if (backupResult.skipped) {
            res.status(200).json({ success: true, skipped: true, message: 'Backup folder for today already exists. Skipping backup process.' });
        } else {
            res.status(200).json({ success: true, skipped: false, message: 'Database backup completed successfully.' });
        }
    } catch (error) {
        console.error(`Database backup failed: ${error}`);
        res.status(500).json({ success: false, message: 'Database backup failed.' });
    }
  });

  app.get('/backups', async (req, res) => {
    try {
        const uri = process.env.DB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        const database = client.db(process.env.DB_NAME); // Replace 'your_database_name' with your actual database name
        const backupsCollection = database.collection('backups'); // Assuming your backups are stored in a collection named 'backups'

        const backups = await backupsCollection.find().toArray();
        res.status(200).json(backups);
    } catch (error) {
        console.error('Error fetching backups:', error);
        res.status(500).json({ message: 'Failed to fetch backups.' });
    }
  });

  app.get('/download-backup/:backupId', async (req, res) => {
  try {
    const backupId = req.params.backupId;

    // Fetch encrypted files from MongoDB based on the backup ID
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const backupsCollection = database.collection('backups');
    // Fetch encrypted files from MongoDB based on the backup ID
    const backup = await backupsCollection.findOne({ _id: new ObjectId(backupId) });

    if (!backup) {
      return res.status(404).json({ message: 'Backup not found.' });
    }

    // Create a zip archive
    const archive = archiver('zip');

    // Set the response headers for zip file download
    res.attachment(`${backup.folderName}.zip`);
    archive.pipe(res);

    // Add encrypted files to the zip archive
    backup.encryptedFiles.forEach((file, index) => {
      const filename = `${index}.enc`; // Set a default filename or use a unique identifier
      console.log('Appending file:', filename);
      archive.append(file.buffer, { name: filename });
    });

    // Finalize the zip archive
    archive.finalize();

      } catch (error) {
        console.error('Error downloading backup:', error);
        res.status(500).json({ message: 'Failed to download backup.' });
      }
    });

  app.post('/trigger-daily-backup', async (req, res) => {
      try {
          await backupDailyDatabase(); // Trigger the backup function
          res.status(200).json({ success: true, message: 'Daily backup triggered successfully.' });
      } catch (error) {
          console.error(`Failed to trigger daily backup: ${error}`);
          res.status(500).json({ success: false, message: 'Failed to trigger daily backup.' });
      }
  });

    app.post('/cancel-daily-backup', async (req, res) => {
      try {
        cancelDailyBackup(); // Cancel the scheduled backup
          res.status(200).json({ success: true, message: 'Scheduled daily backup canceled successfully.' });
      } catch (error) {
          console.error(`Failed to cancel scheduled daily backup: ${error}`);
          res.status(500).json({ success: false, message: 'Failed to cancel scheduled daily backup.' });
      }
  });





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

