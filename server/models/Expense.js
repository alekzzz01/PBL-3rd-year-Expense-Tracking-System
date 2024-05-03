import mongoose from "mongoose";

const ExpenseItemSchema = new mongoose.Schema({
  expenseType: { type: String },
  paymentMethod: { type: String },
  category: { type: String },
  amount: { type: Number },
  fullName: { type: String },
  tabletype: { type: String, default: "Expense" },
  date: { type: Date, default: Date.now },
  // Add fields for month and year
  month: { type: Number, default: () => new Date().getMonth() + 1 },
  year: { type: Number, default: () => new Date().getFullYear() }
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
