import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ FIND ADMIN FROM ADMIN COLLECTION
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!token) {
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
