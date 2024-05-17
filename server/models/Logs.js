import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
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

const Logs = mongoose.model('Logs', logSchema);

export { Logs };
