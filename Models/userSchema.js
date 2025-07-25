// User schema definition for MongoDB using Mongoose
const mongoose = require("mongoose");

// Define the structure of a user document
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's full name
  email: { type: String, required: true, unique: true }, // Unique email address
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["user", "admin"], default: "user" }, // User role
  createdAt: { type: Date, default: Date.now }, // Account creation date
});

// Export the schema for use in model creation
module.exports = { userSchema };
