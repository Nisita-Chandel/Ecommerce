import express from "express";
import {
  createAdmin,
  adminLogin,
} from "../controllers/auth.controller.js";

const router = express.Router();

// CREATE ADMIN (RUN ONCE)
router.post("/create-admin", createAdmin);

// ADMIN LOGIN
router.post("/admin/login", adminLogin);

export default router;
