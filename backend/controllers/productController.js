// controllers/productController.js
import Product from "../models/productModel.js";

// ✅ Get products by category (e.g. /api/v1/product?category=Food)
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).limit(20); // limit to avoid huge payload
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("🔥 Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};
