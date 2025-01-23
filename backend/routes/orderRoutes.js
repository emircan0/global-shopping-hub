const express = require('express');
const router = express.Router();
const { getUserOrders, updateOrderStatus, getOrderById, createOrder, deleteOrder } = require('../controllers/orderController');

// Tüm siparişleri getir
router.get('/:email', getUserOrders);

// Sipariş ID'sine göre sipariş getir
router.get('/:id', getOrderById);

// Sipariş durumunu güncelle
router.put('/:id/status', updateOrderStatus);

// Yeni sipariş oluştur
router.post('/', createOrder);

// Sipariş sil
router.delete('/:id', deleteOrder);

module.exports = router;

