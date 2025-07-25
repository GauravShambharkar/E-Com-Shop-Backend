const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware");

// Register
router.post("/register", userController.registerUser);
// Login
router.post("/login", userController.loginUser);
// Profile (protected)
router.get("/profile", userMiddleware.verifyUser, userController.getProfile);

module.exports = router;
