import {User} from '../models/User.js'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../middleWare/asyncHandler.js';


const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
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
        const token = jwt.sign({ userId: user._id, role: user.role, username: user.username, email: user.email, }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000});

        const responseObj = {
            status: true,
            message: "Login successful",
            userId: user._id,
            lastLogin: user.lastLogin,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        };

        console.log("Response Object:", responseObj); // Log the response object
        return res.json(responseObj);

        

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
    // Clear the token cookie
    res.clearCookie('token');
    res.json({ status: true, message: "Logout successful" });
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


const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const forgetPassword = asyncHandler(async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
    
        // If user not found, send error message
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
    
        // Generate a unique JWT token for the user that contains the user's id
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {expiresIn: "10m",});
    
        // Send the token to the user's email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_APP_EMAIL,
          },
        });
    
        // Email configuration
        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Reset Password",
          html: `<h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="http://localhost:3000/resetpassword/${token}">http://localhost:3000/resetpassword/${token}</a>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>`,
        };
    
        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          res.status(200).send({ message: "Email sent" });
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
});

const resetPassword = asyncHandler(async (req, res) => {
    try {
        // Extract the token from the URL parameter
        const token = req.params.token;

        // console.log('Token:', token); 

        // Verify the token sent by the user
        const decodedToken = jwt.verify(
          token,
          process.env.SECRET_KEY
        );
    
        // If the token is invalid, return an error
        if (!decodedToken) {
          return res.status(401).send({ message: "Invalid token" });
        }
    
        // find the user with the id from the token
        const user = await User.findOne({ _id: decodedToken.userId });
        if (!user) {
          return res.status(401).send({ message: "No user found" });
        }

        // Extract newPassword and confirmPassword from the request body
        const { newPassword, confirmPassword } = req.body;

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
          return res.status(400).send({ message: "New password and confirm password do not match" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
    
        // Update user's password, clear reset token and expiration time
        user.password = hashedPassword;
        await user.save();
    
        // Send success response
        res.status(200).send({ message: "Password updated" });
      } catch (err) {
        // Send error response if any error occurs
        res.status(500).send({ message: err.message });
      }
});




  
  
export { login, register, logout, checkUsernameExists, getAllUsers, forgetPassword, resetPassword  };