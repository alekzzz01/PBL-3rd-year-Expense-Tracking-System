import express from 'express';
import { login, register, verifyOTP, logout, checkUsernameExists, getAllUsers, forgetPassword, resetPassword, updateUserProfile, getUserDetails, getTotalRegisteredUsersPerMonth, getTotalRegisteredUsers, getTotalActiveUsers, getNewUsers, removeUser, viewUser } from "../controllers/userController.js"; 
import checkAuth from "../middleWare/checkAuth.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', checkAuth, logout);
router.get('/check-username/:username', checkUsernameExists);
router.get('/getUserDetails',checkAuth, getUserDetails);
router.post('/verifyotp', verifyOTP);

router.post("/forgetPassword", forgetPassword);
router.post("/resetpassword/:token", resetPassword);
router.put('/updateprofile', checkAuth, updateUserProfile);

router.get('/getUsers', getAllUsers)
router.get('/getUsersperMonth',  getTotalRegisteredUsersPerMonth)
router.get('/getTotalUsers', getTotalRegisteredUsers )
router.get('/getTotalActiveUsers', getTotalActiveUsers)
router.get('/getTotalNewUsers', getNewUsers)
router.delete('/removeUser/:userId', removeUser);
router.get('/viewUser/:userId', viewUser);

router.get('/', (req, res, next ) => {
 res.send("Hello World")
});

export { router as UserRouter };
