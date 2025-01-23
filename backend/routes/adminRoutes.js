const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');
const { getOrders, updateOrderStatus, createProduct, deleteProduct, getProducts } = require('../controllers/orderController');

// Admin giriş
router.post('/login', adminLogin);

// Tüm siparişleri getir
router.get('/orders', getOrders);

// Sipariş durumunu güncelle
router.put('/orders/:id/status', updateOrderStatus);

// Tüm ürünleri getir
router.get('/products', getProducts);

// Yeni ürün oluştur
router.post('/products', createProduct);

// Ürün sil
router.delete('/products/:id', deleteProduct);

module.exports = router;
