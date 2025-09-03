import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
console.log("Hi");
export const requireSignIn = asyncHandler(async (req, res, next) => {
    // Inside requireSignIn
console.log("✅ Entered requireSignIn middleware");



  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "JWT must be provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "JWT must be provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = user; // ✅ Important: attach user
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user) {
      console.log("❌ req.user not set");
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== 1) {
      console.log("❌ User is not admin");
      return res.status(403).json({ message: "Access denied" });
    }

    console.log("✅ Admin verified");
    next();
  } catch (err) {
    console.error("🔥 isAdmin error:", err);
    return res.status(500).json({ message: "Middleware error", error: err.message });
  }
});

