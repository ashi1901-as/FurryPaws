import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import newProduct from "../controllers/product/newProduct.js";
import getSellerProducts from "../controllers/product/getSellerProducts.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import findProduct from "../controllers/product/findProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import getFilteredProducts from "../controllers/product/getFilteredProducts.js";
import searchProductController from "../controllers/product/searchProductController.js";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();
console.log("✅ productRoute file loaded");

// ✅ GET products (optionally filter by category)
router.get("/", getProducts);

// More specific routes
router.get("/seller-product", requireSignIn, isAdmin, getSellerProducts);
router.get("/search/:keyword", searchProductController);
router.get("/filtered-products", getFilteredProducts);

// More general routes (with dynamic parameters) at the bottom
router.get("/:id", findProduct);
router.post("/new-product", requireSignIn, isAdmin, newProduct);
router.post("/delete-product", requireSignIn, isAdmin, deleteProduct);
router.post("/update/:id", requireSignIn, isAdmin, updateProduct);

export default router;
