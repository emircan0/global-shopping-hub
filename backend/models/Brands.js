const mongoose = require('mongoose');

// Marka şeması
const brandSchema = new mongoose.Schema(
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

// Marka modelini oluşturma
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
