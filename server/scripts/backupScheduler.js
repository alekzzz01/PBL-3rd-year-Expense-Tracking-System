import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, Binary } from 'mongodb';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import schedule from 'node-schedule'; // Import node-schedule for scheduling tasks

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURL = process.env.DB_URI;
const dbName = 'PBLSystem';
const backupDir = path.join(__dirname, 'backups');

let backupJob; // Variable to store the scheduled backup job

// Schedule backup to run daily at midnight
schedule.scheduleJob('0 0 * * *', () => {
    console.log('Running daily backup...');
    backupDailyDatabase();
});

export async function backupDailyDatabase() {
    try {
        const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();
        const currentDate = new Date().toISOString().split('T')[0];
        const currentDateDir = path.join(backupDir, currentDate);

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        if (!fs.existsSync(currentDateDir)) {
            fs.mkdirSync(currentDateDir);

            let totalSize = 0;
            const encryptedFiles = []; // Array to store encrypted files

            for (const collectionInfo of collections) {
                const collectionName = collectionInfo.name;
                const fileName = `${collectionName}_${currentDate}.json.enc`; // Include date in file name
                const filePath = path.join(currentDateDir, fileName);
                const collectionData = await db.collection(collectionName).find().toArray();
                const encryptedData = encryptData(JSON.stringify(collectionData));
                fs.writeFileSync(filePath, encryptedData);
                console.log(`Backup created for collection ${collectionName}`);
                totalSize += encryptedData.length; // Calculate total size of backups

                const fileContent = fs.readFileSync(filePath);
                encryptedFiles.push(new Binary(fileContent));
            }

            // Insert backup information into MongoDB collection
            await db.collection('backups').insertOne({
                date: currentDate,
                folderName: path.basename(currentDateDir),
                size: totalSize,
                encryptedFiles: encryptedFiles
            });

            console.log('Backup process completed successfully.');
            
        } else {
            console.log('Backup folder for today already exists. Skipping backup process.');
            return { success: false, skipped: true, message: 'Backup folder for today already exists. Skipping backup process.' };
        }

        await client.close();
    } catch (error) {
        console.error(`Backup process failed: ${error}`);
    }
}

function encryptData(data) {
    const secretKey = process.env.ENCRYPTION_KEY;
    console.log('Encryption key:', secretKey);
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// Function to cancel the scheduled daily backup
export function cancelDailyBackup() {
    if (backupJob) {
        backupJob.cancel(); // Cancel the scheduled backup job
        console.log('Scheduled daily backup canceled successfully.');
    } else {
        console.log('No scheduled backup found to cancel.');
    }
}
