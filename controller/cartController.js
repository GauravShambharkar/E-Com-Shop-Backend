const { Cart, Product } = require("../Models/Models");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch cart.", error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    cart.updatedAt = Date.now();
    await cart.save();
    res.status(200).json({ message: "Item added to cart.", cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not add to cart.", error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    cart.updatedAt = Date.now();
    await cart.save();
    res.status(200).json({ message: "Item removed from cart.", cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not remove from cart.", error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    const item = cart.items.find((item) => item.product.equals(productId));
    if (!item)
      return res.status(404).json({ message: "Item not found in cart." });
    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();
    res.status(200).json({ message: "Cart updated.", cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not update cart.", error: err.message });
  }
};
