const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { verifyUser } = require("../middleware/userMiddleware");

router.get("/", verifyUser, cartController.getCart);
router.post("/", verifyUser, cartController.addToCart);
router.put("/", verifyUser, cartController.updateCartItem);
router.delete("/:productId", verifyUser, cartController.removeFromCart);

module.exports = router;
