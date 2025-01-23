import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchProducts, createOrder} from '../api/index'; 
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [products, setProducts] = useState([]);
  const { userInfo } = useSelector(state => state.user);

  // Fetch products from the API (if needed for cart context)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data); // Assuming the API returns a `data` field
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

   const [formData, setFormData] = useState({
          name: userInfo.name || '',
          email: userInfo.email || '',
          phone: userInfo.phone || '',
          birthDate: userInfo.birthDate ? new Date(userInfo.birthDate).toISOString().split('T')[0] : '',
          gender: userInfo.gender || ''
      });


  // Handle order creation
  const handleOrderSubmit = async () => {


    // Build the order data
    const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
      })),
      totalAmount: cartTotal + (cartTotal >= 2000 ? 0 : 49.90), // Include shipping cost if applicable
      status: 'pending', // Or whatever status you want to start with
      
    };


    try {
      const response = await createOrder(orderData);
      if (response.status === 201) {
        // Handle successful order creation, e.g., navigate to order confirmation page
        console.log('Order placed successfully:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-cream-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <i className="fas fa-shopping-bag text-6xl text-brown-300 mb-6"></i>
            <h2 className="font-serif text-3xl text-brown-800 mb-4">Sepetiniz Boş</h2>
            <p className="text-brown-600 mb-8">Alışverişe başlamak için ürünlerimizi keşfedin.</p>
            <Link 
              to="/" 
              className="inline-block bg-brown-800 text-cream-50 px-8 py-3 rounded-lg hover:bg-brown-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl text-brown-800 mb-8">Alışveriş Sepeti</h1>

        <div className="flex gap-8">
          {/* Sepet Ürünleri */}
          <div className="flex-1">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-cream-200">
                <div className="flex gap-6">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl text-brown-800">{item.name}</h3>
                        <p className="text-brown-600 text-sm mt-1">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-brown-400 hover:text-brown-600 transition-colors"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-cream-200 rounded-lg">
                        <button 
                          className="px-4 py-2 text-brown-600 hover:text-brown-800 transition-colors"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-x border-cream-200">{item.quantity}</span>
                        <button 
                          className="px-4 py-2 text-brown-600 hover:text-brown-800 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold text-brown-800">
                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sipariş Özeti */}
          <div className="w-96">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-cream-200 sticky top-24">
              <h2 className="font-serif text-2xl text-brown-800 mb-6">Sipariş Özeti</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-brown-600">
                  <span>Ara Toplam</span>
                  <span>{cartTotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-brown-600">
                  <span>Kargo</span>
                  <span>{cartTotal >= 2000 ? 'Ücretsiz' : '49.90 ₺'}</span>
                </div>
                {cartTotal < 2000 && (
                  <div className="text-sm text-brown-500 italic">
                    {(2000 - cartTotal).toLocaleString('tr-TR')} ₺ daha alışveriş yaparak ücretsiz kargo fırsatından yararlanın!
                  </div>
                )}
                <div className="border-t border-cream-200 pt-4">
                  <div className="flex justify-between text-xl font-semibold text-brown-800">
                    <span>Toplam</span>
                    <span>{(cartTotal + (cartTotal >= 2000 ? 0 : 49.90)).toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleOrderSubmit}  // Trigger order creation on click
                className="w-full bg-brown-800 text-cream-50 py-4 rounded-lg mt-6 hover:bg-brown-700 transition-colors font-medium"
              >
                Ödemeye Geç
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-brown-600">
                  <i className="fas fa-truck text-brown-400 w-6"></i>
                  <span className="ml-2 text-sm">2000 TL üzeri alışverişlerde ücretsiz kargo</span>
                </div>
                <div className="flex items-center text-brown-600">
                  <i className="fas fa-undo text-brown-400 w-6"></i>
                  <span className="ml-2 text-sm">30 gün içinde ücretsiz iade</span>
                </div>
                <div className="flex items-center text-brown-600">
                  <i className="fas fa-lock text-brown-400 w-6"></i>
                  <span className="ml-2 text-sm">Güvenli ödeme</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
