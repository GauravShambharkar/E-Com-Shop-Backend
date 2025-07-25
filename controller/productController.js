const { Product } = require("../Models/Models");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch products.", error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch product.", error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully.", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not create product.", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product updated.", product: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not update product.", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product deleted." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not delete product.", error: err.message });
  }
};
