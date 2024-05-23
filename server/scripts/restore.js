import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URL
const mongoURL = process.env.DB_URI;
const dbName = 'PBLSystem';

// Directory containing backup files
const backupDir = path.join(__dirname, 'backups');

async function restoreDatabase() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);

    // Read backup files from backup directory
    const backupFiles = fs.readdirSync(backupDir);

    // Restore each collection from its corresponding JSON file
    for (const backupFile of backupFiles) {
      const collectionName = path.basename(backupFile, '.json');
      const filePath = path.join(backupDir, backupFile);
      const collectionData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      await db.collection(collectionName).deleteMany({}); // Clear existing collection data
      await db.collection(collectionName).insertMany(collectionData);
      console.log(`Collection ${collectionName} restored.`);
    }

    console.log('Restore process completed successfully.');

    // Close MongoDB connection
    await client.close();
  } catch (error) {
    console.error(`Restore process failed: ${error}`);
  }
}

restoreDatabase();
