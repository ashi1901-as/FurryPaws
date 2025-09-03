import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import UserModel from "./models/userModel.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new UserModel({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      phone: "1234567890",
      address: "Admin Address",
      role: 1,
    });

    await admin.save();
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

connectDB().then(createAdmin);
