const { Order, Cart, Product } = require("../Models/Models");

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }
    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const order = new Order({
      user: req.user.id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      status: "pending",
    });
    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not place order.", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch orders.", error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product user");
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch all orders.", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.status(200).json({ message: "Order status updated.", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not update order.", error: err.message });
  }
};
