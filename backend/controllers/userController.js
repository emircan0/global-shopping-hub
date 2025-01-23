const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT Token üretme
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'gizlianahtar123', {
        expiresIn: '30d',
    });
};

// Kullanıcı kaydı
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Kullanıcı mevcut mu kontrolü
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
        }

        // Şifreyi hash et
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Yeni kullanıcı oluştur
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Hash'lenmiş şifreyi kaydet
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Kullanıcı oluşturulamadı' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası: Kullanıcı oluşturulamadı', error: error.message });
    }
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kullanıcı kontrolü ve şifre doğrulama
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) { // Şifreyi karşılaştır
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Geçersiz email veya şifre' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası: Giriş yapılamadı', error: error.message });
    }
};

// Kullanıcı profili al
const getUserProfile = async (req, res) => {
    const { userId } = req.params; // userId params olarak alınacak

    try {
        let user;

        if (userId) {
            // Eğer userId varsa, sadece ilgili kullanıcıyı getir
            user = await User.findById(userId).select('-password');
        } else {
            // Eğer userId yoksa, tüm kullanıcıları getir
            user = await User.find().select('-password');
        }

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası: Kullanıcı bilgisi alınamadı', error: error.message });
    }
};


const getUserProfileId = async (req, res) => {
    const { userId } = req.params;  // URL parametresinden userId alıyoruz
  
    try {
      // Veritabanından kullanıcıyı buluyoruz
      const user = await User.findById(userId);
     
  
      // Eğer kullanıcı bulunmazsa, hata mesajı dönüyoruz
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
  
      // Kullanıcı bulunduysa, şifreyi gizleyerek geri dönüyoruz
      const { password, ...userData } = user.toObject();  // Şifreyi hariç tutuyoruz
  
      return res.status(200).json(userData);  // Kullanıcı verisini döndürüyoruz
    } catch (error) {
      console.error('API Hatası:', error);
      return res.status(500).json({ message: 'Bir hata oluştu, lütfen tekrar deneyin' });
    }
};

// Kullanıcı profili güncelle
const updateUserProfile = async (req, res) => {
    console.log('updateUserProfile fonksiyonu çalıştı');

    const { userId } = req.params; // URL parametresinden userId alınır
    const { name, email, password, phone, birthDate, gender } = req.body; // Body'den gerekli veriler alınır

    console.log('User ID:', userId); // Gelen userId'yi loglama
    console.log('Gelen Veriler:', { name, email, password, phone, birthDate, gender });

    try {
        const user = await User.findById(userId); // Kullanıcıyı ID'ye göre buluyoruz

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Güncelleme yapılacak alanlar
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.birthDate = birthDate || user.birthDate;
        user.gender = gender || user.gender;

        // Eğer şifre değişikliği yapılacaksa
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save(); // Güncellenen kullanıcıyı kaydet

        res.status(200).json({
            message: 'Profil başarıyla güncellendi',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                birthDate: user.birthDate,
                gender: user.gender,
            },
        });
    } catch (error) {
        console.error('Hata Detayı:', error);
        res.status(500).json({ message: 'Sunucu hatası: Profil güncellenemedi', error: error.message });
    }
};




// Kullanıcı silme
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Silme işlemi
        await User.findByIdAndDelete(id);

        res.json({ message: 'Kullanıcı başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası: Kullanıcı silinemedi', error: error.message });
    }
};

const getAddresses = async (req, res) => {
    try {
        const user = req.user;
        
        // Kullanıcı kontrolü
        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı doğrulanamadı.' });
        }

        // Kullanıcının adreslerini popüle et
        const populatedUser = await user.populate('addresses');
        
        // Eğer kullanıcının adresleri yoksa, hata mesajı döndür
        if (!populatedUser.addresses || populatedUser.addresses.length === 0) {
            return res.status(404).json({ message: 'Kullanıcının adresi bulunamadı.' });
        }

        // Adres bilgilerini döndür
        res.json({
            message: 'Kullanıcı adresleri başarıyla alındı.',
            addresses: populatedUser.addresses,  // 'addresses' alanını kullanın
        });
        
        console.log(populatedUser.addresses);  // Popüle edilmiş adresleri konsola yazdır
    } catch (error) {
        res.status(500).json({
            message: 'Sunucu hatası: Kullanıcı adresleri alınamadı.',
            error: error.message,
        });
    }
};




const addAddressToUser = async (req, res) => {
    try {
        const user = req.user; // Kullanıcıyı req.user'dan al

        console.log('Adres ekleme isteği:', user); // Debug için konsola yazdırabilirsiniz.

        const { title, fullName, phone, city, district, zipCode, fullAddress, isDefault } = req.body;

        // Gerekli alanların kontrolü
        if (!title || !fullName || !phone || !city || !district || !zipCode || !fullAddress) {
            return res.status(400).json({ message: 'Tüm alanları doldurmanız gerekmektedir.' });
        }
        
        // Yeni adresi ekleyin
        const newAddress = { title, fullName, phone, city, district, zipCode, fullAddress, isDefault };
        
        user.addresses.push(newAddress); // Kullanıcıya adres ekle
        await user.save();
        
        // Adres ekleme işlemi başarılı
        return res.status(200).json({ message: 'Adres başarıyla eklendi.', user });
    } catch (error) {
        console.error('Adres eklenirken bir hata oluştu:', error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Adres doğrulama hatası: ' + error.message });
        }
        return res.status(500).json({ message: 'Adres eklenirken bir hata oluştu. Lütfen tekrar deneyin.' });
    }
};



// Adres güncelleme
const updateAddressForUser = async (req, res) => {
    try {
        const user = req.user; // Giriş yapan kullanıcıyı al
        const { addressId } = req.params; // Güncellenmek istenen adresin ID'si
        const { title, fullName, phone, city, district, zipCode, fullAddress, isDefault } = req.body;

        // Kullanıcının adreslerini kontrol et
        const address = user.addresses.id(addressId); // Belirtilen adresi bul
        if (!address) {
            return res.status(404).json({ message: 'Adres bulunamadı' });
        }

        // Adresi güncelle
        address.title = title;
        address.fullName = fullName;
        address.phone = phone;
        address.city = city;
        address.district = district;
        address.zipCode = zipCode;
        address.fullAddress = fullAddress;
        address.isDefault = isDefault;

        await user.save();

        res.status(200).json(user); // Güncellenmiş kullanıcıyı döndür
    } catch (error) {
        res.status(500).json({ message: 'Adres güncellenirken bir hata oluştu' });
    }
};

// Şifre değiştirme fonksiyonu
 const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id; // Kimlik doğrulama middleware ile gelen userId

    try {
        // Kullanıcıyı buluyoruz
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Mevcut şifreyi doğruluyoruz
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Geçerli şifre hatalı' });
        }

        // Yeni şifreyi hashliyoruz
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Şifreyi güncelliyoruz
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Şifre başarıyla değiştirildi' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Şifre değiştirilirken bir hata oluştu' });
    }
};

// Şifre sıfırlama fonksiyonu
const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Kullanıcıyı e-posta ile buluyoruz
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Şifre sıfırlama token'ı oluşturuyoruz
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token 1 saat geçerli olacak
        );

        // Şifre sıfırlama linki oluşturuyoruz
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Nodemailer ile e-posta gönderiyoruz
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,  // E-posta adresinizi girin
                pass: process.env.EMAIL_PASS   // E-posta şifrenizi girin
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Şifre Sıfırlama',
            text: `Şifrenizi sıfırlamak için aşağıdaki linke tıklayın: \n\n${resetLink}`
        };

        // E-posta gönderimini gerçekleştiriyoruz
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Şifre sıfırlama bağlantısı e-posta ile gönderildi' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Şifre sıfırlama sırasında bir hata oluştu' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getUserProfileId,
    getAddresses,
    updateUserProfile,
    deleteUser, 
    addAddressToUser,
    updateAddressForUser,
    changePassword,
    resetPassword
};
