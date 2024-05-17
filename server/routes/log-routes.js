import express from 'express';
import {  getAllLogs  }  from "../controllers/logsController.js"; 

const router = express.Router();

router.get('/logs', getAllLogs);



export { router as LogsRouter };