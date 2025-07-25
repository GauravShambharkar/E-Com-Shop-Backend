const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { verifyUser } = require("../middleware/userMiddleware");

router.get("/", categoryController.getAllCategories);
router.post("/", verifyUser, categoryController.createCategory);
router.put("/:id", verifyUser, categoryController.updateCategory);
router.delete("/:id", verifyUser, categoryController.deleteCategory);

module.exports = router;
