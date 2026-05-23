import express from "express";
import { login, register, logout, getProfile, changePassword, deleteAccount } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiter.js";


const router = express.Router();

//PUBLIC ROUTES (Limiter Khusus)
router.post("/register", registerLimiter, register);  
router.post("/login", loginLimiter, login);           

//AUTH PROTECTED
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.put("/password", authMiddleware, changePassword);
router.delete("/account", authMiddleware, deleteAccount);

export default router;
