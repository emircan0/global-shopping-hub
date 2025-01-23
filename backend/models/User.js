const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Adres şeması
const addressSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Ev, İş vb.
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    zipCode: { type: String, required: true },
    fullAddress: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
}); 

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        default: ''
    },
    birthDate: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId, // ObjectId tipi
        ref: 'Address' // İlişkili model 'Address'
    }],
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Otomatik olarak createdAt ve updatedAt alanlarını ekler
});

// Şifre kontrolü
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Şifreyi hashlemek için pre-save hook
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Eğer şifre değişmemişse, geçiş yap
    }

    const salt = await bcrypt.genSalt(10); // 10 iterasyonlu salt
    this.password = await bcrypt.hash(this.password, salt);
    next(); // next() fonksiyonunu çağırarak işlemi sonlandırıyoruz
});

// Mongoose modelini oluştur
module.exports = mongoose.model('User', userSchema);
