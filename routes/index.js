import express from "express";
import { Register, getUsers, Login, Logout } from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import vegetableRoutes from "./vegetable.js";

const router = express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

//vegetableRoutes
router.use(vegetableRoutes);

export default router;


