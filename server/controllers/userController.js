import {User} from '../models/User.js'

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../middleWare/asyncHandler.js';


const login = asyncHandler(async (req, res) => {

    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ status: false, message: "User is not registered" });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ status: false, message: "Password is incorrect" });
        }

        // Update lastLogin field
        user.lastLogin = new Date();
        await user.save();  

        // Include user ID in the JWT payload
        const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        return res.json({ status: true, message: "Login successful", userId: user._id, lastLogin: user.lastLogin, username: user.username, email: user.email, role: user.role, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }


});

const register = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }


    const hashpassword = await bcrypt.hash(password, 10)

    const newUser = new User ({
        username,
        email,
        password: hashpassword, // Only store the hashed password
        role: "user" 
    })
    

    await newUser.save()
    return res.json({status: true, message: "record registered"})


});

const logout = asyncHandler(async (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



const checkUsernameExists = asyncHandler(async (req, res) => {
    const { username } = req.params;
    try {
      const existingUser = await User.findOne({ username });
      res.json({ exists: !!existingUser }); // Return true if user exists, false otherwise
    } catch (error) {
      console.error('Error checking username:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
export { login, register, logout, checkUsernameExists };