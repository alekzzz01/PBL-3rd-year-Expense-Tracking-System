import express from 'express';
import {  getAllLogs, removeEvent  }  from "../controllers/logsController.js"; 

const router = express.Router();

router.get('/logs', getAllLogs);
router.delete('/removeEvent/:eventId', removeEvent);



export { router as LogsRouter };