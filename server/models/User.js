import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: {type: String, required: true},
    lastLogin: { type: Date, default: Date.now }, // Adding lastLogin field
    
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel as User };
