// Category routes for e-commerce platform
const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { verifyUser } = require("../middleware/userMiddleware");
// TODO: Add adminMiddleware for admin-only routes

// Get all categories
router.get("/", categoryController.getAllCategories);
// Create a new category (admin only)
router.post(
  "/",
  verifyUser,
  /* adminMiddleware, */ categoryController.createCategory
);
// Update a category (admin only)
router.put(
  "/:id",
  verifyUser,
  /* adminMiddleware, */ categoryController.updateCategory
);
// Delete a category (admin only)
router.delete(
  "/:id",
  verifyUser,
  /* adminMiddleware, */ categoryController.deleteCategory
);

module.exports = router;
