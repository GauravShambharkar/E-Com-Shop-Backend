const { Category } = require('../Models/Models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch categories.', error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: 'Category created successfully.', category });
  } catch (err) {
    res.status(500).json({ message: 'Could not create category.', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Category not found.' });
    res.status(200).json({ message: 'Category updated.', category: updated });
  } catch (err) {
    res.status(500).json({ message: 'Could not update category.', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Category not found.' });
    res.status(200).json({ message: 'Category deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete category.', error: err.message });
  }
};
