import productModel from "../../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const newProduct = async (req, res) => {
  try {
    console.log("🔥 Received POST request to /new-product");
    console.log("🔥 Is req.files defined?", !!req.files);
    
    if (!req.user?._id)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    // ✅ Destructure new fields from req.body
    const { 
        name, 
        description, 
        price, 
        discountPrice, 
        category, 
        stock, 
        warranty, 
        brandName,
        ratings, // ✅ New field
        fAssured // ✅ New field
    } = req.body;

    // Check for required files
    if (!req.files || !req.files.logo) {
      return res.status(400).json({ success: false, message: "Logo is required" });
    }

    if (!req.files.images) {
      return res.status(400).json({ success: false, message: "At least 1 product image required" });
    }

    // Upload logo
    let logoResult;
    try {
      logoResult = await cloudinary.uploader.upload(req.files.logo.tempFilePath, {
        folder: "brands",
      });
      console.log("✅ Logo uploaded:", logoResult);
    } catch (err) {
      console.error("⚠️ Cloudinary logo upload failed:", err);
      return res.status(500).json({ message: "Logo upload failed. Please try again.", error: err.message });
    }

    // Upload product images
    const imagesToUpload = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    const imagesLink = [];
    try {
      for (const file of imagesToUpload) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        imagesLink.push({ public_id: result.public_id, url: result.secure_url });
        console.log("✅ Image uploaded:", result.public_id);
      }
    } catch (err) {
      console.error("⚠️ Cloudinary images upload failed:", err);
      return res.status(500).json({ message: "Product images upload failed. Please try again.", error: err.message });
    }

    // Parse highlights/specifications
    let highlights = [];
    if (req.body.highlights) {
      highlights = Array.isArray(req.body.highlights)
        ? req.body.highlights
        : [req.body.highlights];
    }
    
    let specifications = [];
    if (req.body.specifications) {
      const specsArray = Array.isArray(req.body.specifications) ? req.body.specifications : [req.body.specifications];
      for (const s of specsArray) {
        try {
          specifications.push(JSON.parse(s));
        } catch (err) {
          console.error("⚠️ Failed to parse a specification object:", s, err);
          return res.status(400).json({ success: false, message: "One or more specifications are in an invalid format." });
        }
      }
    }

    // Create product with new fields
    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      discountPrice: Number(discountPrice),
      category,
      stock: Number(stock),
      warranty: Number(warranty),
      highlights,
      specifications,
      images: imagesLink,
      brand: { name: brandName, logo: { public_id: logoResult.public_id, url: logoResult.secure_url } },
      seller: req.user._id,
      // ✅ Add new fields
      ratings: Number(ratings),
      fAssured: fAssured === 'true' // FormData sends 'true'/'false' strings
    });

    return res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("🔥 New Product Error:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

export default newProduct;