const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { verifyUser } = require("../middleware/userMiddleware");

router.post("/", verifyUser, orderController.placeOrder);
router.get("/", verifyUser, orderController.getUserOrders);
router.get("/all", verifyUser, orderController.getAllOrders);
router.put("/:id", verifyUser, orderController.updateOrderStatus);

module.exports = router;
