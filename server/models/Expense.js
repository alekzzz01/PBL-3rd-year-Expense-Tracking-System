import mongoose from "mongoose";

const ExpenseItemSchema = new mongoose.Schema({
  tabletype: { type: String, default: "Expense" },
  expenseType: { type: String },
  paymentMethod: { type: String },
  category: { type: String },
  amount: { type: Number },
  fullName: { type: String },
  date: { type: Date, default: Date.now },
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
