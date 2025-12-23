import express from "express";
import {
  createAdmin,
  adminLogin,
  loginUser,
  registerUser,

} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser); // ✅ ADD THIS

router.post("/login", loginUser);

router.post("/create-admin", createAdmin);
router.post("/admin/login", adminLogin);

export default router;
