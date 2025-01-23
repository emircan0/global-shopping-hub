import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { fetchProduct } from '../api/index';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProduct(id); // Veriyi API'den al
        setProduct(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Ürün verisi alınırken hata:', error);
        setError('Ürün verisi alınırken bir hata oluştu.');
        setLoading(false);
      }
    };

    getProductData();
  }, [id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-12">
          {/* Ürün Görselleri */}
          <div className="w-1/2">
            <div className="relative h-[600px] rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images?.[selectedImage] || '/placeholder.jpg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Ürün Görseli ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer border-2 rounded-md ${selectedImage === index ? 'border-brown-800' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="w-1/2">
            <h1 className="font-serif text-4xl text-brown-800 mb-4">{product.name}</h1>
            <p className="text-2xl text-brown-800 font-semibold mb-6">
              {product.price} ₺
              {product.discount > 0 && (
                <span className="text-red-600 text-lg ml-4">
                  (%{product.discount} indirim)
                </span>
              )}
            </p>
            <p className="text-brown-600 mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-serif text-xl text-brown-800 mb-4">Ürün Detayları</h3>
              <ul className="space-y-2">
                {product.brand && <li><strong>Marka:</strong> {product.brand}</li>}
                {product.category && <li><strong>Kategori:</strong> {product.category}</li>}
                {product.sku && <li><strong>SKU:</strong> {product.sku}</li>}
                {product.dimensions && (
                  <li>
                    <strong>Boyutlar:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                  </li>
                )}
                {product.weight && <li><strong>Ağırlık:</strong> {product.weight} kg</li>}
                <li><strong>Stok Durumu:</strong> {product.stock > 0 ? `Stokta (${product.stock} adet)` : 'Tükendi'}</li>
                <li><strong>Puan:</strong> {product.rating} / 5</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-cream-200 rounded-lg">
                <button 
                  className="px-4 py-2 text-brown-600 hover:text-brown-800 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-cream-200">{quantity}</span>
                <button 
                  className="px-4 py-2 text-brown-600 hover:text-brown-800 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => addToCart({ ...product, quantity })}
                className="flex-1 bg-brown-800 text-cream-50 py-3 rounded-lg hover:bg-brown-700 transition-colors"
              >
                Sepete Ekle
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-brown-600">
                <i className="fas fa-truck text-brown-400 w-6"></i>
                <span className="ml-2">2-4 iş günü içinde kargo</span>
              </div>
              <div className="flex items-center text-brown-600">
                <i className="fas fa-undo text-brown-400 w-6"></i>
                <span className="ml-2">30 gün içinde ücretsiz iade</span>
              </div>
              <div className="flex items-center text-brown-600">
                <i className="fas fa-shield-alt text-brown-400 w-6"></i>
                <span className="ml-2">2 yıl garanti</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
