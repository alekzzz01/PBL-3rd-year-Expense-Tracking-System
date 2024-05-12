import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, required: true },

    
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  


    failedLoginAttempts: { type: Number, default: 0 }, // Track failed login attempts
    isLocked: { type: Boolean, default: false }, // Track if the account is locked
    passwordHistory: [{ type: String }] // Array to store recent passwords
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel as User };
