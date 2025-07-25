// Cart routes for e-commerce platform
const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { verifyUser } = require("../middleware/userMiddleware");

// Get the current user's cart
router.get("/", verifyUser, cartController.getCart);
// Add an item to the cart
router.post("/", verifyUser, cartController.addToCart);
// Update item quantity in the cart
router.put("/", verifyUser, cartController.updateCartItem);
// Remove an item from the cart
router.delete("/:productId", verifyUser, cartController.removeFromCart);

module.exports = router;
