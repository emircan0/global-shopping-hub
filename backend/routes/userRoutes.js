const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); 
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUserProfileId,
    deleteUser,
    getAddresses,
    addAddressToUser,  // Adres ekleme fonksiyonu
    updateAddressForUser,  // Adres güncelleme fonksiyonu
    changePassword,
    resetPassword
} = require('../controllers/userController');

// Kullanıcı kayıt rotası
router.post('/register', registerUser);

// Kullanıcı giriş rotası
router.post('/login', loginUser);

// Kullanıcı silme rotası
router.delete('/:id', deleteUser);

// Kullanıcı profili için ID'ye göre getir
router.get('/profile/:userId', getUserProfileId);

// Kullanıcı profilini güncelleme rotası (ID'ye göre)
router.put('/profile/:userId', updateUserProfile);

// Giriş yapan kullanıcının profilini almak
router.get('/profile', getUserProfile);

// Adres ekleme (Giriş yapan kullanıcının profiline adres ekler)
router.post('/profile/address', protect, addAddressToUser);

// Adres güncelleme (Giriş yapan kullanıcının profilindeki adresi günceller)
router.put('/profile/address/:addressId', updateAddressForUser); // Güncellenmesi gereken adresi belirtiyoruz

// Giriş yapan kullanıcının profilini almak
router.get('/profile/address', protect, getAddresses);


// Şifre değiştirme rotası (Giriş yapan kullanıcının şifresini değiştirir)
router.post('/change-password', protect, changePassword);

// Şifre sıfırlama rotası (Kullanıcıya e-posta gönderir)
router.post('/reset-password', resetPassword);


module.exports = router;
