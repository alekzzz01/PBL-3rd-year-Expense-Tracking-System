import mongoose from 'mongoose';


const amountItemSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
      },
    date: {
        type: Date,
        default: Date.now
      },
    note: {
        type: String
      }
});


const savingItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  goalAmount: {
      type: Number,
      required: true
  },

  finishBy: {
      type: Date
  },

  frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'monthly'
    },

    
  amountItems: [amountItemSchema],


});



const SavingsSchema = new mongoose.Schema({

 
    savingItems: [savingItemSchema],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"]
    }
});

const SavingsModel = mongoose.model("Savings", SavingsSchema);

export default SavingsModel;
