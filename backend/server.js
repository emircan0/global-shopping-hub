const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

// Environment Variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // CORS middleware (tüm kaynaklardan gelen isteklere izin verir)
app.use(express.json()); // JSON verilerini alabilmek için middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Uploads dizinini statik olarak sunuyoruz

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sosyetinincantacisi';
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Routes
app.use('/api/products', productRoutes); // Ürünlerle ilgili işlemler
app.use('/api/orders', orderRoutes); // Siparişlerle ilgili işlemler
app.use('/api/users', userRoutes); // Kullanıcılarla ilgili işlemler

// Error Handling Middleware (Genel hata yönetimi)
app.use((err, req, res, next) => {
  console.error('Hata:', err.stack);
  res.status(500).json({ message: 'Bir hata oluştu!' });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} adresinde çalışıyor`);
});
