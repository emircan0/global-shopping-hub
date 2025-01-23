const { MongoClient } = require('mongodb');

// MongoDB bağlantı URI
const uri = "mongodb+srv://emircanmertt:7zlPxP6FmH66tAYU@dbsosyetinincantacisi.1xite.mongodb.net/?retryWrites=true&w=majority&appName=dbSosyetininCantacisi";
const client = new MongoClient(uri);

// MongoDB bağlantı fonksiyonu
async function connectDB(dbName) {
    try {
        await client.connect();
        console.log("MongoDB connected successfully!");
        return client.db(dbName); // Veritabanı ismini parametre olarak alıyoruz
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Bağlantı hatası durumunda uygulamayı durdur
    }
}

// Bağlantıyı dışa aktarıyoruz
module.exports = connectDB;
