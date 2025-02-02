import {User} from '../models/User.js'
import {Logs} from '../models/Logs.js'
import { getClientIp } from '../utils/getIpinfo.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middleWare/asyncHandler.js';
import crypto from 'crypto';

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-character hex OTP
};

const sendOTPEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_APP_EMAIL,
      },
  });

  const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Moneyme OTP Verification Code',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <!DOCTYPE html>
      <html dir="ltr" lang="en">
      
        <head>
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          <meta name="x-apple-disable-message-reformatting" />
        </head>
        <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Confirm your email address<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
        </div>
      
        <body style="background-color:#ffffff;margin:0 auto;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:0px 20px">
            <tbody>
              <tr style="width:100%">
                <td>
                  
                  <h1 style="color:#1d1c1d;font-size:36px;font-weight:700;margin:30px 0;padding:0;line-height:42px">Login Code</h1>
                  <p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">Your verification code is:</p>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:rgb(245, 244, 245);border-radius:4px;margin-bottom:30px;padding:40px 10px">
                    <tbody>
                      <tr>
                        <td>
                          <p style="font-size:30px;line-height:24px;margin:16px 0;text-align:center;vertical-align:middle">${otp}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-size:14px;line-height:24px;margin:16px 0;color:#000">If you didn&#x27;t request this email, there&#x27;s nothing to worry about, you can safely ignore it.</p>
                
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td><a href="https://slackhq.com" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Our blog</a>   |   <a href="https://slack.com/legal" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Policies</a>   |   <a href="https://slack.com/help" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Help center</a>   |   <a href="https://slack.com/community" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="6" style="color:#b7b7b7;text-decoration:underline" target="_blank">Slack Community</a>
                          <p style="font-size:12px;line-height:15px;margin:16px 0;color:#b7b7b7;text-align:left;margin-bottom:50px">©2022 Slack Technologies, LLC, a Salesforce company. <br />500 Howard Street, San Francisco, CA 94105, USA <br /><br />All rights reserved.</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      
      </html>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending OTP email:', error);
      } else {
          console.log('OTP email sent:', info.response);
      }
  });
};

const login = asyncHandler(async (req, res) => {  
  const { email, password } = req.body;
  const ipAddress = getClientIp(req);

  try {
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      await Logs.create({ email, eventType: 'Error Logs', eventDetails: 'User is not registered', ipAddress });
      return res.status(404).json({ status: false, message: "User is not registered" });
    }

    // Check if the account is locked
    if (user.isLocked) {
      await Logs.create({ email, eventType: 'Error Logs', eventDetails: 'Account is locked. Please reset your password.', ipAddress });
      return res.status(403).json({ status: false, message: "Account is locked. Please reset your password." });
    }

     // Check if the password is expired
     if (user.passwordExpires && Date.now() > user.passwordExpires) {
      await Logs.create({ email, eventType: 'Error Logs', eventDetails: 'Password expired. Please reset your password.', ipAddress });
      return res.status(401).json({ status: false, message: "Password expired. Please reset your password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 3) {
        user.isLocked = true;
        await user.save();
        await Logs.create({ email, eventType: 'Error Logs', eventDetails: 'Account is locked due to multiple failed attempts', ipAddress });
        return res.status(401).json({ status: false, message: "Account is locked. Please reset your password." });
      }

      await user.save();
      return res.status(401).json({ status: false, message: "Password is incorrect" });
    }

    user.failedLoginAttempts = 0;

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    sendOTPEmail(user.email, otp);
    // await Logs.create({ email, eventType: 'User Logs', eventDetails: 'OTP sent', ipAddress });

    // Generate a token containing the email for OTP verification
    const otpToken = jwt.sign({ email: user.email }, process.env.KEY, { expiresIn: '10m' });
    console.log("otpToken:", otpToken);
    res.cookie('otpToken', otpToken, { httpOnly: true, maxAge: 10 * 60 * 1000 });

    return res.json({ status: true, message: "OTP sent to your email. Please verify to proceed.", otpToken });
  } catch (error) {
    console.error("Login error:", error);
    await Logs.create({ email, eventType: 'Error Logs', eventDetails: 'Internal server error', ipAddress });
    return res.status(500).json({ message: "Internal server error" });
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const ipAddress = getClientIp(req);
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: "Authorization header is missing or invalid" });
  }
  const otpToken = authHeader.split(' ')[1]; // Extract token from the header
  console.log('OTP Token:', otpToken);

  if (!otpToken) {
    return res.status(400).json({ message: "OTP token is missing" });
  }

  try {
    const decoded = jwt.verify(otpToken, process.env.KEY);
    const email = decoded.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    user.lastLogin = new Date();
    user.status = "Active";
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.KEY, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); 

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

    await Logs.create({ userId: user._id, email, eventType: 'User Logs', eventDetails: 'OTP verified and login successful', ipAddress });
    return res.json(responseObj);
  } catch (error) {
    console.error("OTP verification error:", error);
    await Logs.create({ eventType: 'Error Logs', eventDetails: 'Internal server error during OTP verification', ipAddress });
    return res.status(500).json({ message: "Internal server error" });
  }
});


const register = asyncHandler(async (req, res) => {
  const ipAddress = getClientIp(req);

  const { username, email, password } = req.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const passwordExpires = new Date();
  passwordExpires.setMonth(passwordExpires.getMonth() + 3);

  const newUser = new User ({
      username,
      email,
      password: hashpassword,
      role: "user",
      passwordExpires,
  });

  await newUser.save();

  await Logs.create({ email, eventType: 'User Logs', eventDetails: 'Registration successful', ipAddress });
  return res.json({ status: true, message: "record registered" });
});


const logout = asyncHandler(async (req, res) => {
  const ipAddress = getClientIp(req);

  try {
    // Check if the user is authenticated
    if (!req.user || !req.user._id) {
   
      await Logs.create({ eventType: 'Event Logs', eventDetails: 'Unauthorized logout attempt', ipAddress });
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;
   

    // Fetch user from the database
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user status to "Inactive"
    user.status = "Inactive";
    await user.save();


    // Clear the token cookie
    res.clearCookie('token');
    
    // Log the successful logout
    
    await Logs.create({ userId, eventType: 'User Logs', eventDetails: 'Logout successful', ipAddress });

    return res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error("Error setting user status to inactive:", error);
    // Handle error if needed
    await Logs.create({ userId,  eventType: 'Error logs', eventDetails: 'Error during logout', ipAddress });
    return res.status(500).json({ success: false, message: 'Internal server error' });
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
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html dir="ltr" lang="en">
          
            <head>
              <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
            </head>
            <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Moneyme reset your password<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
            </div>
          
            <body style="background-color:#f6f9fc;padding:10px 0">
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
                <tbody>
                  <tr style="width:100%">
                    <td><img alt="Dropbox" height="50" src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t1.15752-9/440839202_958374569066143_1977991097249215707_n.png?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE7CB--WK43tAkMgsfFKJmwI0X9eZ9WVWEjRf15n1ZVYctyHdKRNdKO7ytsvpIahK1TQjkFPtTJ__eghBuvoitp&_nc_ohc=_xvjX-KNGd4Q7kNvgFQI2SX&_nc_ht=scontent.fmnl30-2.fna&oh=03_Q7cD1QG4w5LFSUlTrfgVFL-jYYno-TpKxuOpnDJIeVOLno0DsQ&oe=665F0879" style="display:block;outline:none;border:none;text-decoration:none" width="40" />
                      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                        <tbody>
                          <tr>
                            <td>
                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Hi ${user.username},</p>
                              <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">We've received a request to reset the password for your Moneyme account. If you initiated this request, please click on the button below to set a new password:</p><a href="http://localhost:3000/resetpassword/${token}" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#268bd2;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 7px;mso-font-width:-100%;mso-text-raise:21" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px">Reset password</span><span><!--[if mso]><i style="letter-spacing: 7px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                              <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">If you didn't request a password reset or if this was a mistake, please disregard and delete this email.</p>
                      
                              <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Thank you for using Moneyme!</p>

                              <p style="font-size:16px;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Best regards,</p>
                              <p style="font-size:16px;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:700;color:#404040">The Moneyme Team</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
          
          </html>`,

        //   html: `<h1>Reset Your Password</h1>
        // <p>Click on the following link to reset your password:</p>
        // <a href="http://localhost:3000/resetpassword/${token}">http://localhost:3000/resetpassword/${token}</a>
        // <p>The link will expire in 10 minutes.</p>
        // <p>If you didn't request a password reset, please ignore this email.</p>`,
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
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "New password and confirm password do not match" });
    }

     // Define the new expiration time for the password (e.g., 1 minute from now)
     const newPasswordExpiration = new Date();
    newPasswordExpiration.setMonth(newPasswordExpiration.getMonth() + 3);

    // Debug log: Log the current contents of the password history
    console.log("Password History before update:", user.passwordHistory);

    // Check if the new password matches any of the recent passwords
    const isRecentPassword = user.passwordHistory.some(oldPasswordHash => {
      console.log("Comparing with:", oldPasswordHash);
      return bcrypt.compareSync(newPassword, oldPasswordHash);
    });

    if (isRecentPassword) {
      console.log("New password matches a recent password.");
      return res.status(400).send({ message: "Cannot reuse recent passwords" });
    }

    // Debug log: Log the hashed version of the new password before updating
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    console.log("Hashed New Password:", hashedNewPassword);

    // Update user's password and password history, clear reset token and expiration time
    user.passwordHistory.unshift(hashedNewPassword); // Add hashed new password to history
    user.passwordHistory = user.passwordHistory.slice(0, 5); // Limit history to 5 passwords
    user.password = hashedNewPassword;
    user.passwordExpires = newPasswordExpiration; // Set the new password expiration
    user.isLocked = false;
    await user.save();

    // Debug log: Log the updated contents of the password history
    console.log("Password History after update:", user.passwordHistory);

    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  const userId = req.user._id;  

  const ipAddress = getClientIp(req);

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Capitalize first letter of each word in first name and last name
      const formattedFirstName = firstName.replace(/\b\w/g, char => char.toUpperCase());
      const formattedLastName = lastName.replace(/\b\w/g, char => char.toUpperCase());
      
      user.firstName = formattedFirstName;
      user.lastName = formattedLastName;
      user.bio = bio;
      await user.save();

    
      await Logs.create({ userId, eventType: 'User Logs', eventDetails: 'Update profile successful', ipAddress });

      return res.json({ status: true, message: "User profile updated successfully", user });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  console.log("req.user:", req.user); // Log req.user to see its structure

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const userId = req.user._id;  

  try {
    // Fetch user by ID with required fields
    const user = await User.findById(userId, 'email username firstName lastName bio');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }


});


// admin side


const getAllUsers = asyncHandler(async (req, res) => {
  try {
      const users = await User.find({}, 'firstName lastName email username bio status');
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



const getTotalRegisteredUsersPerMonth = asyncHandler(async (req, res) => {
  try {
    const userCountPerMonth = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, // Extract month from createdAt field
          year: { $year: "$createdAt" }, // Extract year from createdAt field
        }
      },
      {
        $group: {
          _id: { month: '$month', year: '$year' },
          totalUsers: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 } // Sort the result by year and month
      }
    ]);

    res.status(200).json({ success: true, data: userCountPerMonth });
  } catch (error) {
    console.error('Error getting total registered users per month:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const getTotalRegisteredUsers  = asyncHandler(async (req, res) => {
  try {
    // Query the database to count the number of registered users
    const totalRegisteredUsers = await User.countDocuments();
    res.json({ success: true, totalRegisteredUsers });
  } catch (error) {
    console.error('Error fetching total registered users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch total registered users' });
  }
});


const getTotalActiveUsers = asyncHandler(async (req, res) => {
  try {
    // Query the database to count the number of active users
    const totalActiveUsers = await User.countDocuments({ status: "Active" });
    res.json({ success: true, totalActiveUsers });
  } catch (error) {
    console.error('Error fetching total active users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch total active users' });
  }
});

const getNewUsers = asyncHandler(async (req, res) => {
  try {
    // Calculate a date (e.g., 30 days ago from now) to define the threshold for "new" users
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Query the database to count the number of new users
    const totalNewUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo } // Filter users created within the last 30 days
    });

    res.json({ success: true, totalNewUsers });
  } catch (error) {
    console.error('Error fetching total new users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch total new users' });
  }
});


const removeUser = async (req, res) => {
  const ipAddress = getClientIp(req);

  try {
      const userId = req.params.userId; // Extract userId from request parameters
      console.log("Removing user with ID:", userId); // Log the userId to verify it
      // Use userId to remove the user from the database
      // For example:
      const result = await User.findByIdAndDelete(userId); // Assuming you're using Mongoose
      console.log("Removal result:", result); // Log the result of the removal operation
      if (!result) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      console.log("User removed successfully");

      await Logs.create({ userId, email: 'Admin', eventType: 'User logs', eventDetails: 'User removed successfully', ipAddress });
      res.status(200).json({ success: true, message: 'User removed successfully' });
  } catch (error) {
      console.error('Error removing user:', error);
      await Logs.create({ userId, email: 'Admin', eventType: 'error', eventDetails: 'Server error', ipAddress });
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const viewUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters
    const user = await User.findById(userId, '_id username email lastName firstName role bio createdAt status lastLogin');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




  
export { login, verifyOTP, register, logout, checkUsernameExists, getAllUsers, forgetPassword, resetPassword, updateUserProfile, getUserDetails, getTotalRegisteredUsersPerMonth, getTotalRegisteredUsers, getTotalActiveUsers, getNewUsers, removeUser, viewUser};