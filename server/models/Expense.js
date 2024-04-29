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

ExpenseSchema.methods.deleteExpenseItem = async function (expenseItemId) {
  // Find the index of the expense item with the given ID
  const index = this.expenseItems.findIndex(item => item._id.toString() === expenseItemId);

  // If the expense item exists, remove it from the array
  if (index !== -1) {
      this.expenseItems.splice(index, 1);
      await this.save(); // Save the updated expense document
      return true; // Return true to indicate successful deletion
  }
  return false; // Return false if expense item with the given ID is not found
};


const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
