import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminProtect = async (req, res, next) => {
  let token;

  // 1️⃣ Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️⃣ Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔴 THIS IS THE CODE YOU ASKED ABOUT
      if (decoded.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Not authorized as admin" });
      }

      // 4️⃣ Attach admin to request
      req.admin = await Admin.findById(decoded.id).select("-password");

      next(); // ✅ MUST CALL NEXT
    } catch (error) {
      return res.status(401).json({ message: "Invalid admin token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
