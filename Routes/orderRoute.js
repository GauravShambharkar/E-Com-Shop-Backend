// Order routes for e-commerce platform
const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { verifyUser } = require("../middleware/userMiddleware");
// TODO: Add adminMiddleware for admin-only routes

// Place a new order from the user's cart
router.post("/", verifyUser, orderController.placeOrder);
// Get all orders for the current user
router.get("/", verifyUser, orderController.getUserOrders);
// Admin: Get all orders
router.get(
  "/all",
  verifyUser,
  /* adminMiddleware, */ orderController.getAllOrders
);
// Admin: Update order status
router.put(
  "/:id",
  verifyUser,
  /* adminMiddleware, */ orderController.updateOrderStatus
);

module.exports = router;
