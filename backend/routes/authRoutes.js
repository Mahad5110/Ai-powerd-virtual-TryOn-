import express from "express";
import { signup, signin } from "../controllers/authController.js";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;