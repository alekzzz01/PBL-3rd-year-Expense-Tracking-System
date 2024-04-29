import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String },
    expenseType: { type: String, required: true},
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"]
      },
});


const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
