// backend/middleware/multer.js
import multer from "multer";

// Memory storage for files (Cloudinary needs buffer)
const storage = multer.memoryStorage();
export const upload = multer({ storage });
