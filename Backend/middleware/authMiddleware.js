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

export const adminProtect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ CHECK ADMIN ROLE
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Not an admin token" });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid admin token" });
  }
};
