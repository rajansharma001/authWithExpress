import express from "express";
import { loginValidation } from "../middleware/validateLoginInput.ts";
import {
  signInController,
  signupController,
} from "../controllers/authController.ts";
import { signupValidation } from "../middleware/validateSignupInputs.ts";
export const router = express.Router();

router.post("/login", loginValidation, signInController);
router.post("/register", signupValidation, signupController);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "User logged out" });
});
