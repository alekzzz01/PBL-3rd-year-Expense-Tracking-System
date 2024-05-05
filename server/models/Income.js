import mongoose from "mongoose";

const IncomeItemSchema = new mongoose.Schema({
  incomeType: { type: String, default: "Income" },
  paymentMethod: { type: String },
  category: { type: String },
  amount: { type: Number },
  fullName: { type: String },
  tabletype: { type: String, default: "Income" }, // Specify type as String, and default value
  date: { type: Date, default: Date.now },
  month: { type: Number, default: () => new Date().getMonth() + 1 },
  year: { type: Number, default: () => new Date().getFullYear() }
});

const IncomeSchema = new mongoose.Schema({
  incomeItems: [IncomeItemSchema], // Array of income items
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"]
  }
});

const IncomeModel = mongoose.model("Income", IncomeSchema);

export default IncomeModel;
