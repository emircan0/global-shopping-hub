const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct } = require('../controllers/productController');

// Dosya yükleme ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');  // Yüklenen dosyaların kaydedileceği klasör
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Benzersiz dosya adı oluştur
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Yalnızca resim dosyalarına izin verilir.'));
      }
    }
  });
  

// Tüm ürünleri getir
router.get('/', getProducts);

// Ürün ID'sine göre ürün getir
router.get('/:id', getProductById);

// Yeni ürün oluştur (Dosya yükleme işlemi eklenmiş)
router.post('/', upload.array('images'), createProduct);

// Ürün güncelle (Dosya yükleme işlemi eklenmiş)
router.put('/:id', upload.array('images'), updateProduct);

// Ürün sil
router.delete('/:id', deleteProduct);

module.exports = router;
