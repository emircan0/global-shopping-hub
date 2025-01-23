import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }
    return req;
});

// Ürün API'leri
export const fetchProducts = () => API.get('/products');
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Kullanıcı API'leri
export const signin = (formData) => API.post('/users/login', formData);
export const signup = (formData) => API.post('/users/register', formData);

// Profil Güncelleme (userId parametreli)
export const updateProfile = (userId, userData) => API.put(`/users/profile/${userId}`, userData); // userId'yi URL'ye ekliyoruz.

// Şifre Değiştirme
export const changePassword = (passwordData) => API.post('/users/change-password', passwordData);
export const resetPassword = (email) => API.post('/users/reset-password', { email });
export const updateAddress = (id, addressData) => API.put(`/users/profile/address/${id}`, addressData); 
export const addAddress = (addressData) => API.post(`/users/profile/address`, addressData);
export const deleteAddress = (id) => API.delete(`/users/${id}`);
export const updateNotificationSettings = (settings) => API.put('/users/notifications', settings);
export const getAddresses = () => API.get(`/users/profile/address`);

// Favori işlemleri
export const addToFavorites = (productId) => API.post('/users/favorites', { productId });
export const removeFromFavorites = (productId) => API.delete(`/users/favorites/${productId}`);

// Kategori API'leri
export const fetchCategories = () => API.get('/categories');  // Kategorileri al

// Marka API'leri
export const fetchBrands = () => API.get('/brands');  // Markaları al

export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchUserOrders = (userEmail) => API.get(`/orders/${userEmail}`);

