// Product routes for e-commerce platform
const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { verifyUser } = require("../middleware/userMiddleware");
// TODO: Add adminMiddleware for admin-only routes

// Get all products
router.get("/", productController.getAllProducts);
// Get a single product by ID
router.get("/:id", productController.getProductById);
// Create a new product (admin only)
router.post(
  "/",
  verifyUser,
  /* adminMiddleware, */ productController.createProduct
);
// Update a product (admin only)
router.put(
  "/:id",
  verifyUser,
  /* adminMiddleware, */ productController.updateProduct
);
// Delete a product (admin only)
router.delete(
  "/:id",
  verifyUser,
  /* adminMiddleware, */ productController.deleteProduct
);

module.exports = router;
