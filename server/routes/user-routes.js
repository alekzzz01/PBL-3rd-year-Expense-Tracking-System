import express from 'express';
import { login, register, logout, checkUsernameExists, getAllUsers, forgetPassword, resetPassword } from "../controllers/userController.js"; 
import checkAuth from "../middleWare/checkAuth.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', checkAuth, logout);
router.get('/check-username/:username', checkUsernameExists);

router.post("/forgetPassword", forgetPassword);
router.post("/resetpassword/:token", resetPassword);

router.get('/getUsers', getAllUsers)


router.get('/', (req, res, next ) => {
 res.send("Hello World")
});

export { router as UserRouter };
