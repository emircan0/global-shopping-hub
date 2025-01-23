import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const { cartItemCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="fixed w-full top-0 z-50">
            {/* Üst Banner */}
            <div className="bg-brown-800 text-cream-50 text-center py-2 text-sm font-light">
                <span className="font-serif italic">Elegance in Every Detail</span> | Tüm çantalarda %20 indirim fırsatı | Ücretsiz kargo
            </div>

            <nav className="bg-cream-50 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <Link to="/" className="font-serif text-3xl text-brown-800">
                            ELEGANCE
                        </Link>

                        {/* Arama Çubuğu */}
                        <div className="flex-1 max-w-xl mx-8">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Ürün, kategori veya marka ara..."
                                    className="w-full px-4 py-3 rounded-lg border-cream-200 border-2 focus:outline-none focus:border-brown-300 bg-cream-50 placeholder-brown-300"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>
                        </div>

                        {/* Sağ Menü */}
                        <div className="flex items-center space-x-8">
                            <Link to="/favoriler" className="flex items-center text-brown-800 hover:text-brown-600">
                                <i className="far fa-heart text-xl"></i>
                                <span className="ml-2 text-sm">Favoriler</span>
                            </Link>

                            {userInfo ? (
                                <div className="relative group">
                                    <button className="flex items-center text-brown-800 hover:text-brown-600 py-2">
                                        <i className="far fa-user text-xl"></i>
                                        <span className="ml-2 text-sm">{userInfo.name}</span>
                                    </button>

                                    <div className="absolute right-0 w-48 py-2 mt-1 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2">
                                        <div className="py-2">
                                            <Link 
                                                to="/hesabim" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brown-800"
                                            >
                                                Hesabım
                                            </Link>
                                            <Link 
                                                to="/hesabim?tab=orders" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brown-800"
                                            >
                                                Siparişlerim
                                            </Link>
                                            <Link 
                                                to="/hesabim?tab=addresses" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brown-800"
                                            >
                                                Adreslerim
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brown-800"
                                            >
                                                Çıkış Yap
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link to="/login" className="text-brown-800 hover:text-brown-600">
                                        Giriş Yap
                                    </Link>
                                    <Link to="/register" className="bg-brown-700 text-cream-50 px-4 py-2 rounded-md hover:bg-brown-600">
                                        Üye Ol
                                    </Link>
                                </div>
                            )}

                            <Link to="/sepet" className="flex items-center text-brown-800 hover:text-brown-600">
                                <div className="relative">
                                    <i className="fas fa-shopping-bag text-xl"></i>
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-brown-700 text-cream-50 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </div>
                                <span className="ml-2 text-sm">Sepet</span>
                            </Link>
                        </div>
                    </div>

                    {/* Kategoriler */}
                    <div className="border-t border-cream-200">
                        <ul className="flex justify-center space-x-12 py-4 text-sm font-medium">
                            <li><Link to="/kategori/el-cantalari" className="text-brown-700 hover:text-brown-900">El Çantaları</Link></li>
                            <li><Link to="/kategori/sirt-cantalari" className="text-brown-700 hover:text-brown-900">Sırt Çantaları</Link></li>
                            <li><Link to="/kategori/cuzdan" className="text-brown-700 hover:text-brown-900">Cüzdanlar</Link></li>
                            <li><Link to="/kategori/seyahat" className="text-brown-700 hover:text-brown-900">Seyahat Çantaları</Link></li>
                            <li><Link to="/kategori/aksesuar" className="text-brown-700 hover:text-brown-900">Aksesuarlar</Link></li>
                            <li><Link to="/kampanyalar" className="text-brown-900 font-semibold hover:text-brown-700">Kampanyalar</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
