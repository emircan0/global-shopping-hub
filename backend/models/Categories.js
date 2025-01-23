const mongoose = require('mongoose');

// Kategori şeması
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Kategori modelini oluşturma
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
