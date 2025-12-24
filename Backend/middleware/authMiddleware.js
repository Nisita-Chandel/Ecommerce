import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Admin from "../models/Admin.js";


// ================= USER PROTECT =================
export const protect = async (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  let token; // ✅ FIX: DECLARE TOKEN

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token || token === "null") {
        return res.status(401).json({ message: "Token missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // ✅ MUST CALL
    } catch (error) {
      console.error("JWT ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ================= ADMIN PROTECT =================

// ================= ADMIN PROTECT =================
export const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ ROLE CHECK
      
      // ✅ FETCH FROM ADMIN COLLECTION (FIX)
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      req.admin = admin; // attach admin
      next();
    } catch (error) {
      console.error("ADMIN AUTH ERROR:", error.message);
      return res.status(401).json({ message: "Invalid admin token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
