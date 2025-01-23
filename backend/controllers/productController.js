const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Dosya yükleme ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer middleware'i (dosya türü kontrolü eklenmiştir)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Geçersiz dosya türü'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
}).array('images', 5);

// Tüm ürünleri getir
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Ürünler getirilirken hata oluştu', error: error.message });
    }
};

// ID'ye göre ürün getir
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Ürün bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ürün getirilirken hata oluştu', error: error.message });
    }
};

const createProduct = async (req, res) => {

        try {
            // Resim dosyalarının yollarını alıyoruz
            const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
            console.log('Yüklenen resim yolları:', imagePaths);  // Resim yollarını konsola yazdır

            // Form verilerini kullanarak ürün nesnesini oluşturuyoruz
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                brand: req.body.brand, // Hata burada: `brand` zorunlu alan
                stock: req.body.stock || 0,
                images: imagePaths,
                discount: req.body.discount || 0,
                sku: req.body.sku,
                dimensions: req.body.dimensions,
                weight: req.body.weight,
                status: req.body.status || 'active'
            });

            // Ürünü veritabanına kaydediyoruz
            const createdProduct = await product.save();

            // Başarılı ise ürün detayını döndürüyoruz
            res.status(201).json(createdProduct);
        } catch (error) {
            console.error('Ürün oluşturulurken hata:', error.message);
            res.status(400).json({ message: 'Ürün oluşturulurken hata oluştu', error: error.message });
        }
};



// Ürün güncelle
const updateProduct = async (req, res) => {

        try {
            const product = await Product.findById(req.params.id);
            if (product) {
                product.name = req.body.name || product.name;
                product.description = req.body.description || product.description;
                product.price = req.body.price || product.price;
                product.category = req.body.category || product.category;
                product.brand = req.body.brand || product.brand;
                product.stock = req.body.stock || product.stock;
                product.discount = req.body.discount || product.discount;
                product.sku = req.body.sku || product.sku;
                product.dimensions = req.body.dimensions || product.dimensions;
                product.weight = req.body.weight || product.weight;
                product.status = req.body.status || product.status;
                product.images = req.body.images || product.images;  // Yeni resim yollarını kaydet



                

                const updatedProduct = await product.save();
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Ürün bulunamadı' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Ürün güncellenirken hata oluştu', error: error.message });
        }
};

// Ürün sil
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'Ürün silindi' });
        } else {
            res.status(404).json({ message: 'Ürün bulunamadı' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Ürün silinirken hata oluştu', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
