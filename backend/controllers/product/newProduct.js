import productModel from "../../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
console.log("Reached newProduct route")
const newProduct = async (req, res) => {
  try {
   console.log("🔥 Entered newProduct controller");
console.log("🔥 Request body:", req.body);
console.log("🔥 Request files:", req.files);
console.log("🔥 Logged user:", req.user);

    // ✅ Validate user
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized. User not found." });
    }

    // ✅ Validate logo
    if (!req.files?.logo?.tempFilePath) {
      console.log("❌ Logo file missing or invalid");
      return res.status(400).json({ success: false, message: "Logo file missing or invalid" });
    }

    // ✅ Validate product images
    if (!req.files?.images) {
      console.log("❌ Product images missing");
      return res.status(400).json({ success: false, message: "At least 1 product image required" });
    }

    // ✅ Upload logo to Cloudinary
    const logoResult = await cloudinary.uploader.upload(req.files.logo.tempFilePath, {
      folder: "brands",
    });
    const brandLogo = {
      public_id: logoResult.public_id,
      url: logoResult.secure_url,
    };

    // ✅ Upload product images to Cloudinary
    const imagesArray = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    const imagesLink = [];

    for (const file of imagesArray) {
      if (!file?.tempFilePath) {
        console.log("❌ One of the product images is missing tempFilePath");
        return res.status(400).json({ success: false, message: "Invalid product image file" });
      }

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // ✅ Parse highlights
    const highlights = req.body.highlights
      ? Array.isArray(req.body.highlights)
        ? req.body.highlights
        : [req.body.highlights]
      : [];

    // ✅ Parse specifications safely
    let specifications = [];
    try {
      if (req.body.specifications) {
        specifications = Array.isArray(req.body.specifications)
          ? req.body.specifications.map((s) =>
              typeof s === "string" ? JSON.parse(s) : s
            )
          : [
              typeof req.body.specifications === "string"
                ? JSON.parse(req.body.specifications)
                : req.body.specifications,
            ];
      }
    } catch (err) {
      console.error("❌ Specification parsing error:", err);
      return res.status(400).json({ success: false, message: "Invalid specifications format" });
    }

    // ✅ Extract product info
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      stock,
      warranty,
      brandName,
    } = req.body;

    // ✅ Log all fields before creation
    console.log("✅ Creating product with:", {
      name,
      description,
      price,
      discountPrice,
      category,
      stock,
      warranty,
      highlights,
      specifications,
      images: imagesLink,
      brand: { name: brandName, logo: brandLogo },
      seller: req.user._id,
    });

    // ✅ Create product in MongoDB
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
      brand: {
        name: brandName,
        logo: brandLogo,
      },
      seller: req.user._id,
    });

    console.log("✅ Product created:", product);
    return res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("🔥 New Product Error stack:", error.stack);
    console.error("🔥 Full Error Object:", error);
    return res.status(500).json({
      success: false,
      message: "Error in adding New Product",
      error: error.message,
    });
  }
};

export default newProduct;
