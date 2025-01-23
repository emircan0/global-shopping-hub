const Order = require('../models/Order');

// Belirli bir e-posta adresine sahip siparişleri getir
const getUserOrders = async (req, res) => {
  try {
    const email = req.params.email; // Query parametresinden email alınır.
    
    if (!email) {
      return res.status(400).json({ message: 'E-posta adresi gereklidir' });
    }
    const orders = await Order.find({ customerEmail: email }).populate('products.product');
    res.json(orders);
    console.log(orders);
  } catch (error) {
    res.status(500).json({ message: 'Siparişler getirilirken hata oluştu', error: error.message });
  }
};


// Sipariş ID'sine göre sipariş getir
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Sipariş bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Sipariş getirilirken hata oluştu', error: error.message });
  }
};

// Sipariş durumunu güncelle
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Sipariş bulunamadı' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Sipariş durumu güncellenirken hata oluştu', error: error.message });
  }
};

// Yeni sipariş oluştur
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, products, totalAmount } = req.body;
    const newOrder = new Order({
      customerName,
      customerEmail,
      products,
      totalAmount
    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Sipariş oluşturulurken hata oluştu', error: error.message });
  }
};

// Sipariş sil
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.json({ message: 'Sipariş silindi' });
    } else {
      res.status(404).json({ message: 'Sipariş bulunamadı' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Sipariş silinirken hata oluştu', error: error.message });
  }
};

module.exports = {
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  createOrder,
  deleteOrder
};
