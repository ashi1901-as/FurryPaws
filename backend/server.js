import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary"; // ✅ Import cloudinary here

// Configuration
dotenv.config();

// ✅ PLACE CLOUDINARY CONFIGURATION HERE
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectDB from "./config/database.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
console.log("🔥 .env loaded. Checking Cloudinary keys...");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
console.log("CLOUD_SECRET:", process.env.CLOUD_SECRET);

// 1️⃣ CORS middleware - explicit allowed origins and preflight handling
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "https://furry-paws-xi.vercel.app",
  "http://furry-frontend.s3-website-us-east-1.amazonaws.com",
].filter(Boolean);

console.log("Allowed origins:", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, mobile clients, same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS policy: This origin is not allowed"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// ensure preflight (OPTIONS) is handled for all routes
app.options("*", cors(corsOptions));

// 3️⃣ Body parsers & file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 4️⃣ DB & routes
connectDB();
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);

// 5️⃣ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

