import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { User } from '../models/User.js';

const refreshToken = async (req, res) => {
    try {
        // Get the refresh token from the request body or headers
        const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];
        if (!refreshToken) {
            throw new Error('Refresh token not provided');
        }

        // Verify and decode the refresh token
        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
        const userId = decoded.userId;

        // Fetch user from database
        const user = await User.findById(userId);   
        if (!user) {
            throw new Error('User not found');
        }

        // Generate a new access token
        const accessToken = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h' });
        
        // Send the new access token to the client
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const checkAuth = asyncHandler(async (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token.split(' ')[1], process.env.KEY); // Remove 'Bearer ' from token string
        const userId = decoded.userId; // Extract user ID from decoded token

        // Fetch user data from database using userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user object to request for further processing
        req.user = user;
        next(); // Call next middleware in chain
    } catch (error) {
        console.error(error);
        // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            // Attempt to refresh the token
            return refreshToken(req, res);
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
});




export default checkAuth;