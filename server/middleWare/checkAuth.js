import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { User } from '../models/User.js';

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
        return res.status(401).json({ message: "Unauthorized" });
    }
});

export default checkAuth;
