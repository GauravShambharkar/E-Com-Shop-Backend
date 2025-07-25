const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { verifyUser } = require("../middleware/userMiddleware");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", verifyUser, productController.createProduct);
router.put("/:id", verifyUser, productController.updateProduct);
router.delete("/:id", verifyUser, productController.deleteProduct);

module.exports = router;
