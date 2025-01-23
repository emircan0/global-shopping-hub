import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../api/index'; // API fonksiyonunu import ettik

function ProductList() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]); // Ürünleri tutacak state
  const [loading, setLoading] = useState(true); // Yükleniyor durumunu takip etmek için
  const [error, setError] = useState(null); // Hata durumu için

  // API'den ürünleri çekmek için useEffect kullanıyoruz
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts(); // API'den ürünleri al
        console.log(response.data); // API yanıtını kontrol et
        setProducts(response.data); // Veriyi state'e aktar
        setLoading(false); // Yükleniyor durumunu false yap
      } catch (error) {
        setError('Ürünler yüklenemedi'); // Hata durumunu ayarla
        setLoading(false);
      }
    };

    getProducts(); // Fonksiyonu çağırıyoruz
  }, []); // Boş bağımlılık array'i, bu sayede sadece component ilk yüklendiğinde çalışır

  // Yükleniyor veya hata durumlarını render ediyoruz
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => {
        // Ürün ID'si yoksa ürünü render etmiyoruz
        const productId = product._id; // _id kullanıyoruz

        if (!productId) {
          console.error("Ürün ID'si bulunamadı:", product);
          return null;
        }

        // Resmin doğru URL ile alınıp alınmadığını kontrol et
        const imageUrl = product.images && product.images[0] 
                         ? product.images[0] 
                         : 'path/to/default-image.jpg'; // Varsayılan resim

        // Resim URL'sini konsola yazdırıyoruz
        console.log("Resim URL'si:", ".."+imageUrl);

        return (
          <div key={productId} className="group">
            <div className="relative overflow-hidden rounded-lg bg-cream-50">
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-brown-800 text-cream-50 px-4 py-2 rounded-lg hover:bg-brown-700 transition-colors"
                    >
                      Sepete Ekle
                    </button>
                    <button 
                      onClick={() => productId && navigate(`/product/${productId}`)}  // Eğer id varsa navigasyonu gerçekleştir
                      className="text-brown-800 hover:text-brown-600"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl text-brown-800">{product.name}</h3>
              <p className="text-brown-600 text-sm mt-1">{product.description}</p>
              <p className="text-brown-900 font-semibold mt-2">{product.price.toLocaleString('tr-TR')} ₺</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
