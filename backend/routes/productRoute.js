import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import newProduct from "../controllers/product/newProduct.js";
import getSellerProducts from "../controllers/product/getSellerProducts.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import findProduct from "../controllers/product/findProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import getFilteredProducts from "../controllers/product/getFilteredProducts.js";
import searchProductController from "../controllers/product/searchProductController.js";

// router object
const router = express.Router();
console.log("✅ productRoute file loaded");
// Add new product POST
router.post("/new-product", requireSignIn, isAdmin, (req, res, next) => {
  console.log("🔥 Route hit: /new-product");
  next();
}, newProduct);


// Get Seller Product
router.get("/seller-product", requireSignIn, isAdmin, getSellerProducts);

// Delete Product
router.post("/delete-product", requireSignIn, isAdmin, deleteProduct);

// Find filtered product
router.get("/filtered-products", getFilteredProducts);

// Find product details from product id
router.get("/:id", findProduct);

// Update product details from product id
router.post("/update/:id", requireSignIn, isAdmin, updateProduct);

// Search products using keyword
router.get("/search/:keyword", searchProductController);

export default router;
