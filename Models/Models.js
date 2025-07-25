// Centralized model exports for easy import elsewhere
const mongoose = require("mongoose");
const { userSchema } = require("./userSchema");

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export all models here for scalability
module.exports = {
  User, // User model for authentication and user management
};
