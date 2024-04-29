import mongoose from "mongoose";

const ExpenseItemSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  expenseType: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const ExpenseSchema = new mongoose.Schema({
  expenseItems: [ExpenseItemSchema], // Array of expense items
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"]
  }
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
