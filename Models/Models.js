const mongoose = require("mongoose");
const { userSchema } = require("./userSchema");
const { productSchema } = require("./productSchema");
const { categorySchema } = require("./categorySchema");
const { cartSchema } = require("./cartSchema");
const { orderSchema } = require("./orderSchema");

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);
const Cart = mongoose.model("Cart", cartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = {
  User,
  Product,
  Category,
  Cart,
  Order,
};
