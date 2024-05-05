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

      // Check if the account is locked
      if (user.isLocked) {
          return res.json({ status: false, message: "Account is locked. Please reset your password." });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
          // Increment failed login attempts
          user.failedLoginAttempts += 1;

          // Lock the account if the number of failed attempts exceeds the threshold
          if (user.failedLoginAttempts >= 3) {
              user.isLocked = true;
              await user.save();
              return res.json({ status: false, message: "Account is locked. Please reset your password." });
          }

          await user.save();

          return res.json({ status: false, message: "Password is incorrect" });
      }

      // Reset failed login attempts on successful login
      user.failedLoginAttempts = 0;
      user.lastLogin = new Date();
      await user.save();

      // Include user ID in the JWT payload
      const token = jwt.sign({ userId: user._id, role: user.role, username: user.username, email: user.email }, process.env.KEY, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

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
      const users = await User.find({}, 'firstName lastName email username bio');
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
  const userId = req.user._id; // Assuming you have middleware to authenticate and extract user ID from the token

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update user profile fields
      user.firstName = firstName;
      user.lastName = lastName;
      user.bio = bio;

      await user.save();

      return res.json({ status: true, message: "User profile updated successfully", user });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
});


  
export { login, register, logout, checkUsernameExists, getAllUsers, forgetPassword, resetPassword, updateUserProfile };