const Category = require('../models/Categories');

// Kategori listeleme
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Kategori listelenirken hata oluştu.', error });
  }
};

// Yeni kategori ekleme
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Bu kategori zaten mevcut.' });
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Kategori eklenirken hata oluştu.', error });
  }
};

// Kategori silme
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }

    res.status(200).json({ message: 'Kategori silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Kategori silinirken hata oluştu.', error });
  }
};

module.exports = { getCategories, createCategory, deleteCategory };
