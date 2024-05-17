import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  email: {
    type: String,
  },
  eventType: {
    type: String,
    required: true
  },
  eventDetails: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const LogsModel = mongoose.model('Logs', logSchema);

export { LogsModel as Logs };
