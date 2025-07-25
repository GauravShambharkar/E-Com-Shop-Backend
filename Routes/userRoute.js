// User-related API routes
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware");

// Register a new user
router.post("/register", userController.registerUser);
// Log in an existing user
router.post("/login", userController.loginUser);
// Get the profile of the logged-in user (protected route)
router.get("/profile", userMiddleware.verifyUser, userController.getProfile);

// Export the router to be used in the main server file
module.exports = router;
