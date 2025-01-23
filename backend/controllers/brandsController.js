const Brand = require('../models/Brands');

// Marka listeleme
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Markalar listelenirken hata oluştu.', error });
  }
};

// Yeni marka ekleme
const createBrand = async (req, res) => {
  const { name } = req.body;

  try {
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: 'Bu marka zaten mevcut.' });
    }

    const newBrand = new Brand({ name });
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: 'Marka eklenirken hata oluştu.', error });
  }
};

// Marka silme
const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: 'Marka bulunamadı.' });
    }

    res.status(200).json({ message: 'Marka silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Marka silinirken hata oluştu.', error });
  }
};

module.exports = { getBrands, createBrand, deleteBrand };
