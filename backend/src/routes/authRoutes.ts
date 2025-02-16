import express from "express";
import { login } from "../controllers/authController";
import { register } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;
